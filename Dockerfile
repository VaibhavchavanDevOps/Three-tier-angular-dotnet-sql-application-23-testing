# Use a Windows-based image with .NET Core SDK for building the app
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-nanoserver-1909 AS build

# Set the working directory for the build
WORKDIR /app

# Copy the project file(s) and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining source code
COPY . ./

# Build and publish the application
RUN dotnet publish -c Release -o out

# Install the dotnet-ef tool for migrations
RUN dotnet tool install --global dotnet-ef --version 3.1
ENV PATH="$PATH:/root/.dotnet/tools"

# Add migrations and update the database
RUN dotnet ef migrations add InitialCreate
RUN dotnet ef database update

# Use a Windows-based image with IIS for the runtime
FROM mcr.microsoft.com/dotnet/aspnet:3.1-nanoserver-1909 AS runtime

# Install IIS on the runtime image
RUN powershell -Command \
    Install-WindowsFeature -Name Web-Server,Web-Asp-Net45,Web-Common-Http,Web-ISAPI-Ext,Web-ISAPI-Filter

# Set the working directory for the app
WORKDIR /app

# Copy the published output from the build image
COPY --from=build /app/out ./

# Expose ports for the app and IIS (HTTP and HTTPS)
EXPOSE 80
EXPOSE 443

# Set the entry point to start IIS and your .NET Core app
ENTRYPOINT ["powershell", "-Command", "Start-Service w3svc; Start-Process dotnet 'ElectricEquipmentDotNetCoreProject.dll'; Wait-Process"]

