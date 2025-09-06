using TypeGen.Core.TypeAnnotations;

namespace FinanceApp.Application.DTOs
{
    [ExportTsInterface]
    public class UserAuthenticationResponseDTO
    {
        public string Token { get; set; } = string.Empty;
        public UserDTO User { get; set; } = new();
    }
}