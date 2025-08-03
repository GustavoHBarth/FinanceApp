using FinanceApp.Application.DTOs;

namespace FinanceApp.Application.Services.Interfaces
{
    public interface IAuthService
    {
        Task<UserAuthenticationResponseDTO> Authenticate(LoginDTO loginDto);
        Task<UserAuthenticationResponseDTO> Register(CreateUserDTO createUserDto);
        Task<UserDTO?> GetUserById(Guid userId);
    }
}