using ElectricEquipmentDotNetCoreProject.Models;
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
    public class EquipmentCategoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public readonly UserContext _context;
        public EquipmentCategoryController(IConfiguration configuration, UserContext context)
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

        [HttpGet("getEquipmentCategory")]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.EquipmentCategories.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("addEquipmentCategory")]
        public IActionResult Add(EquipmentCategory equipmentCategory)
        {
            try
            {
                if (_context.EquipmentCategories.Where(u => u.EquipmentCategoryName == equipmentCategory.EquipmentCategoryName).FirstOrDefault() != null)
                {
                    return Ok("Exist");
                }
                _context.EquipmentCategories.Add(equipmentCategory);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updateEquipmentCategory")]
        public IActionResult UpdateEquipmentCategory(EquipmentCategory equipmentCategory)
        {
            try
            {
                var equipmentCategories = _context.EquipmentCategories.Where(u => u.EquipmentCategoryId == equipmentCategory.EquipmentCategoryId).FirstOrDefault();
                if (equipmentCategories == null)
                {
                    return Ok("NotAvailable");
                }
                equipmentCategories.EquipmentCategoryName = equipmentCategory.EquipmentCategoryName;
                _context.Update(equipmentCategories);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteEquipmentCategory/{id}")]
        public IActionResult DeleteEquipmentCategory(int id)
        {
            try
            {
                var equipmentCategories = _context.EquipmentCategories.Where(u => u.EquipmentCategoryId == id).FirstOrDefault();
                if (equipmentCategories == null)
                {
                    return Ok("NotAvailable");
                }
                _context.EquipmentCategories.Remove(equipmentCategories);
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
