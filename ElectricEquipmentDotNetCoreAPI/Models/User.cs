using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ElectricEquipmentDotNetCoreProject.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required(ErrorMessage = "Please Enter UserName")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Please Enter Password")]
        [MinLength(8, ErrorMessage = "Length of Password must be atleast 8 character long")]
        public string Password { get; set; }
        [Required]
        public bool Active { get; set; }
    }
}
