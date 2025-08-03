namespace FinanceApp.Application.DTOs
{
    public class UserAuthenticationResponseDTO
    {
        public string Token { get; set; } = string.Empty;
        public UserDTO User { get; set; } = new();
    }
}