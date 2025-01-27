using Claims.BL.Entities;
using Claims.DAL.Repos.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Claims.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimsController : ControllerBase
    {
        private readonly IClaims claims;

        public ClaimsController(IClaims claims)
        {
            this.claims = claims;
        }

        [HttpGet] // ✅ Specifies this method is for GET requests
        public async Task<IActionResult> Get()
        {
            var data = await claims.GetAllAsync();
            return Ok(data);
        }

        [HttpGet("{id}")] // ✅ Specifies a GET request with an ID parameter
        public async Task<IActionResult> GetById(int id)
        {
            var data = await claims.GetByIdAsync(id);
            if (data == null) return NotFound();
            return Ok(data);
        }

        [HttpPost] // ✅ Specifies this is a POST request
        public async Task<IActionResult> Add([FromBody] Claim claimDto)
        {
            var result = await claims.AddAsync(claimDto);
            return Ok(result);
        }

        [HttpPut] // ✅ Specifies this is a PUT request
        public async Task<IActionResult> Update([FromBody] Claim claimDto)
        {
            var result = await claims.UpdateAsync(claimDto);
            return Ok(result);
        }

        [HttpDelete("{id}")] // ✅ Specifies this is a DELETE request
        public async Task<IActionResult> Delete(int id)
        {
            var data = await claims.DeleteAsync(id);
            if (data == null) return NotFound();
            return Ok(data);
        }
    }
}
