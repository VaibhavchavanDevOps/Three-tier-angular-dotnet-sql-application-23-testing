using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace ElectricEquipmentDotNetCoreProject.Models
{
    public class JwtService
    {
        public string SecretKey { get; set; }
        public int TokenDuration { get; set; }

        private readonly IConfiguration config;
        public JwtService(IConfiguration _config)
        {
            config = _config;
            this.SecretKey = config.GetSection("jwtConfig").GetSection("Key").Value;
            this.TokenDuration = Int32.Parse(config.GetSection("jwtConfig").GetSection("Duration").Value);
        }
        public String GenerateToken(String id, String username)
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));
                var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var payload = new[]
                {
                  new Claim("id",id),
                  new Claim("username",username),
                };
                var jwtToken = new JwtSecurityToken(
                    issuer: "localhost",
                    audience: "localhost",
                    claims: payload,
                    expires: DateTime.Now.AddMinutes(TokenDuration),
                    signingCredentials: signature);
                return new JwtSecurityTokenHandler().WriteToken(jwtToken);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
