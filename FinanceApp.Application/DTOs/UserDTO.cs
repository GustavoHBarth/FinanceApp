using TypeGen.Core.TypeAnnotations;

namespace FinanceApp.Application.DTOs
{
    [ExportTsInterface]
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}