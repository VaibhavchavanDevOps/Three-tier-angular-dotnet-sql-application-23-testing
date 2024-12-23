using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace ElectricEquipmentDotNetCoreProject.Models
{
    public class Equipments
    {
        [Key]
        public int EquipmentId { get; set; }
        [Required]
        public string EquipmentName { get; set; }
        [Required]
        public string PartId { get; set; }
        public int? EquipmentCategoryId { get; set; }
        public EquipmentCategory EquipmentCategory { get; set; }
        public int? EquipmentGroupId { get; set; }
        public EquipmentGroup EquipmentGroup { get; set; }
    }
}
