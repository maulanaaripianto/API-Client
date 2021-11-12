using API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class ProfileVM
    {
        [Required(ErrorMessage = "Please enter your NIK")]
        //  [RegularExpression(@"^.{11,}([0-9]+)$", ErrorMessage = "Minimum 12 characters required and Please enter valid Number")]
        public string NIK { get; set; }

        [Required(ErrorMessage = "Please enter your first name")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Please enter your phone number")]
        // [RegularExpression(@"^.{10,}([0-9]+)$", ErrorMessage = "Minimum 12 characters required and Please enter valid Number")]
        public string PhoneNumber { get; set; }
        [Required(ErrorMessage = "Please enter your birth date")]
        public DateTime BirthDate { get; set; }
        [Required(ErrorMessage = "Please enter your salary")]
        [RegularExpression("([0-9]+)", ErrorMessage = "Please enter valid Number")]
        public int Salary { get; set; }
        [Required(ErrorMessage = "Please enter your email")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }
        [Required(ErrorMessage = "Please enter your Gender")]
        [JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }
        [Required(ErrorMessage = "Please enter your password")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Please enter your degree")]
        public string Degree { get; set; }
        [Required(ErrorMessage = "Please enter your GPA")]
        public string Gpa { get; set; }
        [Required(ErrorMessage = "Please enter your University")]
        public int UniversityId { get; set; }
        public string UniversityName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
