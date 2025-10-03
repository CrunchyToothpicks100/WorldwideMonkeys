using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using UserDataappCore.Api.Models;

namespace UserDataappCore.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<MonkeyDesign> MonkeyDesigns { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var options = new JsonSerializerOptions(); // default options

            modelBuilder.Entity<MonkeyDesign>()
                .Property(m => m.Eyes)
                .HasConversion(
                    v => JsonSerializer.Serialize<string[]>(v, options),
                    v => JsonSerializer.Deserialize<string[]>(v, options)!);

            modelBuilder.Entity<MonkeyDesign>()
                .Property(m => m.Ears)
                .HasConversion(
                    v => JsonSerializer.Serialize<string[]>(v, options),
                    v => JsonSerializer.Deserialize<string[]>(v, options)!);

            modelBuilder.Entity<MonkeyDesign>()
                .Property(m => m.Arms)
                .HasConversion(
                    v => JsonSerializer.Serialize<string[]>(v, options),
                    v => JsonSerializer.Deserialize<string[]>(v, options)!);

            modelBuilder.Entity<MonkeyDesign>()
                .Property(m => m.Legs)
                .HasConversion(
                    v => JsonSerializer.Serialize<string[]>(v, options),
                    v => JsonSerializer.Deserialize<string[]>(v, options)!);

            modelBuilder.Entity<MonkeyDesign>()
                .Property(m => m.Feet)
                .HasConversion(
                    v => JsonSerializer.Serialize<string[]>(v, options),
                    v => JsonSerializer.Deserialize<string[]>(v, options)!);
        }

    }
}
