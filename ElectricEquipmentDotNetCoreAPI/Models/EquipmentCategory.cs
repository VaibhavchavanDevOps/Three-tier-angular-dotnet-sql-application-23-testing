using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ElectricEquipmentDotNetCoreProject.Models
{
    public class EquipmentCategory
    {
        [Key]
        public int EquipmentCategoryId { get; set; }
        [Required]
        public string EquipmentCategoryName { get; set; }
    }
}
