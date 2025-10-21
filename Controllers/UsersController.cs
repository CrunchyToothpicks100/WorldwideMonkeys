using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using UserDataappCore.Api.Data;
using UserDataappCore.Api.Models;


namespace UserDataappCore.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        //POST: Register Users
        [HttpPost("register")]
        public async Task<IActionResult> Regiser([FromBody] User user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
                return BadRequest("Username already exists");

            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return BadRequest(new { message = "Email already exists" });

            user.PasswordHash = HashPassword(user.PasswordHash);
            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            //Cant provide multiple messages, will have to operate on the 200 status code
            return Ok(new {message = "Account Created Succesfully"});
        }
        //POST: Handles login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User login)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == login.Username);

            if (user == null || user.PasswordHash != HashPassword(login.PasswordHash))
                return Unauthorized("Invalid username/password");

            Console.WriteLine($"Trying login for {login.Username}, password hash: {HashPassword(login.PasswordHash)}");
            var allUsers = await _context.Users.ToListAsync();
            foreach (var u in allUsers)
                Console.WriteLine($"{u.Id}: {u.Username} - {u.PasswordHash}");

            return Ok(new { message = "Login successful", userID = user.Id });
        }

        //Manages password security
        //TODO: Implement system to hide hashed password so not found in request body
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

    }
}
