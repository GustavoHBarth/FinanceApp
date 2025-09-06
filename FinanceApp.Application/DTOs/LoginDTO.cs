using System.ComponentModel.DataAnnotations;
using TypeGen.Core.TypeAnnotations;

namespace FinanceApp.Application.DTOs
{
    [ExportTsInterface]
    public class LoginDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
    }
}