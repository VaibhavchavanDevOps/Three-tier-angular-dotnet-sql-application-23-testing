using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ElectricEquipmentDotNetCoreProject.Models
{
    public class UpdatePassword
    {
        [Required(ErrorMessage = "Please Enter UserName")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Please Enter Your Current Password")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Please Enter New Password")]
        public string NewPassword { get; set; }
    }
}
