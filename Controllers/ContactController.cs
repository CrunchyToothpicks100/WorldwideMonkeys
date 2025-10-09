using Microsoft.AspNetCore.Mvc;
using UserDataappCore.Api.Models;
using UserDataappCore.Api.Data;

namespace UserDataappCore.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ContactController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public IActionResult Submit([FromBody] MonkeyDesign form)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Save to database
            _db.MonkeyDesigns.Add(form);
            _db.SaveChanges();

            return Ok(new { message = "Form submitted successfully", monkeyId = form.Id });
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var designs = _db.MonkeyDesigns.ToList();
            return Ok(designs); // returns JSON array
        }

    }
}
