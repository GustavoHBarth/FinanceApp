using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace FinanceApp.API.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUserDTO dto)
        {
            try
            {
                var auth = await _authService.Register(dto);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Path = "/",
                    Expires = DateTimeOffset.UtcNow.AddHours(24)
                };
                Response.Cookies.Append("auth_token", auth.Token, cookieOptions);

                return Ok(new {
                    Success = true,
                    Message = "Usuário registrado com sucesso!",
                    Data = auth
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { 
                    Success = false, 
                    Message = ex.Message 
                });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            try
            {
                var authResponse = await _authService.Authenticate(dto);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Path = "/",
                    Expires = DateTimeOffset.UtcNow.AddHours(24)
                };
                Response.Cookies.Append("auth_token", authResponse.Token, cookieOptions);

                return Ok(new {
                    Success = true,
                    Message = "Login realizado com sucesso!",
                    Data = authResponse
                });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { 
                    Success = false, 
                    Message = ex.Message 
                });
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("auth_token", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/"
            });

            return Ok(new { Success = true });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetUserData()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                
                if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
                {
                    return Unauthorized(new { 
                        Success = false, 
                        Message = "Token inválido!" 
                    });
                }

                var user = await _authService.GetUserById(userId);
                
                if (user == null)
                {
                    return NotFound(new { 
                        Success = false, 
                        Message = "Usuário não encontrado!" 
                    });
                }

                return Ok(new { 
                    Success = true, 
                    Data = user 
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { 
                    Success = false, 
                    Message = ex.Message 
                });
            }
        }
    }
}