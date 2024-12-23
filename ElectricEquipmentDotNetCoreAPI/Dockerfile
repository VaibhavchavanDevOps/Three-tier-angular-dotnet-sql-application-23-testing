# Set the base image
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build

# Set the working directory
WORKDIR /app

# Copy the project file(s) and restore dependencies
COPY *.csproj .
RUN dotnet restore

# Copy the remaining source code
COPY . .

# Build the application
RUN dotnet publish -c Release -o out
RUN dotnet tool install --global dotnet-ef --version 3.1
ENV PATH="$PATH:/root/.dotnet/tools"
RUN dotnet ef migrations add InitialCreate
RUN dotnet ef database update
# Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS runtime

# Set the working directory
WORKDIR /app

# Copy the published output from the build image
COPY --from=build /app/out .

# Expose the desired port(s) for the application
EXPOSE 80
EXPOSE 443
# Set the entry point for the container
ENTRYPOINT ["dotnet", "ElectricEquipmentDotNetCoreProject.dll"]
