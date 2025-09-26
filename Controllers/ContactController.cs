using Microsoft.AspNetCore.Mvc;
using UserDataappCore.Api.Models;

namespace UserDataappCore.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]  //Define endpoint
    public class ContactController : ControllerBase
    {
        [HttpPost]
        public IActionResult Submit([FromBody] MonkeyDesign form)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(new { message = "Form submitted successfully" });
        }
    }
}
