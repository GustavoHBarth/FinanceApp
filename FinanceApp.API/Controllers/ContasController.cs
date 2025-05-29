using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services;
using FinanceApp.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FinanceApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContasController : Controller
    {
        private readonly IContasService _contasService;

        public ContasController(IContasService contasService)
        {
            _contasService = contasService;
        }

        // GET /contas
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contas = await _contasService.GetAllAsync();
            return Ok(contas);
        }

        //GET / contas/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var conta = await _contasService.GetByIdAsync(id);
            if (conta == null) return NotFound();

            return Ok(conta);
        }

        // POST /contas
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateContaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _contasService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT /contas/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Upddate(Guid id, [FromBody] UpdateContaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existente = await _contasService.GetByIdAsync(id);
            if (existente == null) 
                return NotFound();

            dto.Id = id;
            await _contasService.UpdateAsync(dto);
            return NoContent();
        }

        // DELETE /contas/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var existente = await _contasService.GetByIdAsync(id);
            if (existente == null)
                return NotFound();

            await _contasService.DeleteAsync(id);
            return NoContent();
        }
    }
}
