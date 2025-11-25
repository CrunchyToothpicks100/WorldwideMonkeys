using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using UserDataappCore.Api.Data;
using UserDataappCore.Api.Models;

namespace UserDataappCore.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MonkeyController : ControllerBase
    {
        private readonly AppDbContext _db;

        public MonkeyController(AppDbContext db)
        {
            _db = db;
        }

        //POST: Logs created monkeys to database
        [HttpPost]
        public async Task<IActionResult> Submit([FromBody] MonkeyDesign form)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _db.Users.FindAsync(form.UserId);
            if(user == null)
                return BadRequest("Invalid user ID");

            _db.MonkeyDesigns.Add(form);
            await _db.SaveChangesAsync(); //Add monkey to Database
            return Ok(new { message = "Form submitted successfully", monkeyId = form.Id });
        }
        
        //GET: Returns all monkey in database 
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var designs = await _db.MonkeyDesigns
                .Include(m => m.User)
                .Select(m => new MonkeyDTO
                {
                    Id = m.Id,
                    Name = m.Name,
                    Continent = m.Continent,
                    Type = m.Type,
                    Info = m.Info,
                    Username = m.User.Username
                })
                .ToListAsync();

            return Ok(designs);
        }

        //GET: Returns all monkeys for a given user
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            var user = await _db.Users
                .Include(u => u.Monkeys)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound("User not Found");

            var userMonkeys = user.Monkeys.Select(m => new MonkeyDTO
            {
                Id = m.Id,
                Name = m.Name,
                Continent = m.Continent,
                Type = m.Type,
                Info = m.Info,
                Username = user.Username
            }).ToList();

            return Ok(userMonkeys); // <-- Return the DTOs, not user.Monkeys
        }

    }
}
