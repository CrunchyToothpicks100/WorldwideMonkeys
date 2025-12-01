using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32.SafeHandles;
using SQLitePCL;
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
                return BadRequest(new { message = "User ID not found in database" });

            _db.MonkeyDesigns.Add(form);
            await _db.SaveChangesAsync(); //Add monkey to Database
            return Ok(new { message = "Form submitted successfully", monkeyId = form.Id });
        }

        // DELETE: api/Monkeys/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMonkey(int id)
        {
            var monkey = await _db.MonkeyDesigns.FindAsync(id);
            if (monkey == null)
                return NotFound(new { message = "Monkey not found" });

            _db.MonkeyDesigns.Remove(monkey);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Monkey removed successfully" });
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

        //PUT: Modifies existing monkey entries
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMonkey(int id, MonkeyDTO dto)
        {
            var existingMonkey = await _db.MonkeyDesigns.FirstOrDefaultAsync(m => m.Id == id);

            if (existingMonkey == null)
                return NotFound(new {message = "Monkey not found"});

            existingMonkey.Name = dto.Name;
            existingMonkey.Continent = dto.Continent;
            existingMonkey.Type = dto.Type;
            existingMonkey.Info = dto.Info;

            await _db.SaveChangesAsync();

            return Ok(existingMonkey);
        }

    }
}
