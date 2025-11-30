using System.ComponentModel.DataAnnotations;
using UserDataappCore.Api.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string Username { get; set; }

    [Required]
    public required string PasswordHash { get; set; }

    // Initialize collection to avoid validation error
    public ICollection<MonkeyDesign> Monkeys { get; set; } = new List<MonkeyDesign>();
}
