using System.ComponentModel.DataAnnotations;
using UserDataappCore.Api.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string PasswordHash { get; set; }

    // Initialize collection to avoid validation error
    public ICollection<MonkeyDesign> Monkeys { get; set; } = new List<MonkeyDesign>();
}
