using FinanceApp.Application.Configuration;
using FinanceApp.Application.DTOs;
using FinanceApp.Application.Mapper;
using FinanceApp.Application.Services.Interfaces;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FinanceApp.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepository<User> _userRepository;
        private readonly JwtConfiguration _jwtConfig;

        public AuthService(IRepository<User> userRepository, IOptions<JwtConfiguration> jwtConfig)
        {
            _userRepository = userRepository;
            _jwtConfig = jwtConfig.Value;
        }

        public async Task<UserAuthenticationResponseDTO> Authenticate(LoginDTO loginDto)
        {
            var user = await _userRepository.Where(x => x.Email == loginDto.Email).FirstOrDefaultAsync();
            
            if (user == null)
                throw new Exception("Email ou senha inválidos!");

            if (string.IsNullOrEmpty(user.PasswordHash))
                throw new Exception("Usuário não possui senha cadastrada!");

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                throw new Exception("Email ou senha inválidos!");

            return new UserAuthenticationResponseDTO
            {
                Token = GenerateToken(user),
                User = user.ToDTO()
            };
        }

        public async Task<UserAuthenticationResponseDTO> Register(CreateUserDTO createUserDto)
        {
            var existingUser = await _userRepository.Where(x => x.Email == createUserDto.Email).FirstOrDefaultAsync();
            
            if (existingUser != null)
                throw new Exception("Email já está em uso!");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(createUserDto.Password);

            var user = new User
            {
                Name = createUserDto.Name,
                Email = createUserDto.Email,
                PasswordHash = passwordHash
            };

            await _userRepository.Add(user);
            
            return new UserAuthenticationResponseDTO
            {
                Token = GenerateToken(user),
                User = user.ToDTO()
            };
        }

        public async Task<UserDTO?> GetUserById(Guid userId)
        {
            var user = await _userRepository.Where(x => x.Id == userId).FirstOrDefaultAsync();
            return user?.ToDTO();
        }

        private string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(_jwtConfig.ExpiryHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _jwtConfig.Issuer,
                Audience = _jwtConfig.Audience
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}