using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ElectricEquipmentDotNetCoreProject.Models
{
    public class EquipmentGroup
    {
        [Key]
        public int EquipmentGroupId { get; set; }
        [Required]
        public string EquipmentGroupName { get; set; }
        public int? EquipmentCategoryId { get; set; }
        public EquipmentCategory EquipmentCategory { get; set; }
    }
}
