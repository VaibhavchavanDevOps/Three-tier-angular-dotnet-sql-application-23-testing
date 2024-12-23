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
    public class EquipmentGroupController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public readonly UserContext _context;
        public EquipmentGroupController(IConfiguration configuration, UserContext context)
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
        [HttpGet("getEquipmentCategoryByGroupId/{id}")]
        public IActionResult GetequipmentGroupbyId(int id)
        {
            try
            {
                var equipmentCategoryList = _context.EquipmentGroups.Where(u => u.EquipmentCategoryId == id)
                                .Select(a => new { a.EquipmentGroupId, a.EquipmentGroupName });
                return Ok(equipmentCategoryList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addEquipmentGroup")]
        public IActionResult Add(EquipmentGroup equipmentGroup)
        {
            try
            {
                if (_context.EquipmentGroups.Where(u => u.EquipmentGroupName == equipmentGroup.EquipmentGroupName).FirstOrDefault() != null)
                {
                    return Ok("Exist");
                }
                _context.EquipmentGroups.Add(equipmentGroup);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updateEquipmentGroup")]
        public IActionResult UpdateEquipmentCategory(EquipmentGroup equipmentGroup)
        {
            try
            {
                var equipmentGroups = _context.EquipmentGroups.Where(u => u.EquipmentGroupName == equipmentGroup.EquipmentGroupName).FirstOrDefault();
                if (equipmentGroups == null)
                {
                    return Ok("NotAvailable");
                }
                equipmentGroups.EquipmentCategoryId = equipmentGroup.EquipmentCategoryId;
                _context.Update(equipmentGroups);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteEquipmentGroup/{id}")]
        public IActionResult DeleteEquipmentGroup(int id)
        {
            try
            {
                var equipmentGroups = _context.EquipmentGroups.Where(u => u.EquipmentGroupId == id).FirstOrDefault();
                if (equipmentGroups == null)
                {
                    return Ok("NotAvailable");
                }
                _context.EquipmentGroups.Remove(equipmentGroups);
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
