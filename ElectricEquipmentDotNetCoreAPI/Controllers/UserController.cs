using ElectricEquipmentDotNetCoreProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectricEquipmentDotNetCoreProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public readonly UserContext _context;
        public UserController(IConfiguration configuration, UserContext context)
        {
            _configuration = configuration;
            if (context == null)
            {
                throw new ArgumentNullException("context is null");
            }
            else
            {
                _context = context;
            }
        }

        [AllowAnonymous]
        [HttpPost("addUser")]
        public IActionResult Add(User user)
        {
            try
            {
                if (_context.Users.Where(u => u.UserName == user.UserName).FirstOrDefault() != null)
                {
                    return Ok("Exist");
                }
                var userToken = new JwtService(_configuration).GenerateToken(user.UserId.ToString(), user.UserName);
                _context.Users.Add(user);
                _context.SaveChanges();
               return Ok(userToken);
	      // return Ok ("User added successfully");
	
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [AllowAnonymous]
        [HttpPost("loginUser")]
        public IActionResult Login(User login)
        {
            try
            {
                var user = _context.Users.Where(u => u.UserName == login.UserName && u.Password == login.Password).FirstOrDefault();
                if (user != null)
                {
                    if (user.Active == true)
                    {
                        return Ok(new JwtService(_configuration).GenerateToken(
                                              user.UserId.ToString(),
                                              user.UserName));
                    }
                    else
                    {
                        return Ok("NotActive");
                    }
                }
                return Ok("Failure");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updateUser")]
        public IActionResult UpdateUser(UpdatePassword updatePassword)
        {
            try
            {
                var users = _context.Users.Where(u => u.UserName == updatePassword.UserName && u.Password == updatePassword.Password).FirstOrDefault();
                if (users == null)
                {
                    return Ok("EnterCorrectUserNameOrPassword");
                }
                users.Password = updatePassword.NewPassword;
                _context.Update(users);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
