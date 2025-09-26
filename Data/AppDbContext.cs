using Microsoft.EntityFrameworkCore;
using UserDataappCore.Api.Models;
namespace UserDataappCore.Api.Data
{
    public class AppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<MonkeyDesign> MonkeyDesigns { get; set; }
    }
}
