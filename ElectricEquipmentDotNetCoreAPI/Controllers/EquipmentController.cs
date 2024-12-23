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
    public class EquipmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public readonly UserContext _context;
        public EquipmentController(IConfiguration configuration, UserContext context)
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

        [HttpGet("getEquipment")]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Equipment.ToList().Select(a => new { a.EquipmentId, a.EquipmentName }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addEquipment")]
        public IActionResult Add(Equipments equipments)
        {
            try
            {
                if (_context.Equipment.Where(u => u.EquipmentName == equipments.EquipmentName).FirstOrDefault() != null)
                {
                    return Ok("EquipmentExist");
                }
                _context.Equipment.Add(equipments);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updateEquipment")]
        public IActionResult UpdateEquipmentCategory(Equipments equipments)
        {
            try
            {
                var equipment = _context.Equipment.Where(u => u.EquipmentName == equipments.EquipmentName).FirstOrDefault();
                if (equipment == null)
                {
                    return Ok("NotAvailable");
                }
                equipment.PartId = equipments.PartId;
                equipment.EquipmentCategoryId = equipments.EquipmentCategoryId;
                equipment.EquipmentGroupId = equipments.EquipmentGroupId;

                _context.Update(equipment);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("deleteEquipment/{id}")]
        public IActionResult DeleteEquipmentCategory(int id)
        {
            try
            {
                var equipment = _context.Equipment.Where(u => u.EquipmentId == id).FirstOrDefault();
                if (equipment == null)
                {
                    return Ok("NotAvailable");
                }
                _context.Equipment.Remove(equipment);
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
