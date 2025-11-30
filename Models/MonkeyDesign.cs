using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserDataappCore.Api.Models
{
    public class MonkeyDesign
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Continent { get; set; }

        [Required]
        public required string Type { get; set; }

        [Required]
        public required string Info { get; set; }


       // Link to the user who created it
       [ForeignKey("User")]
       public int UserId { get; set; }
       public User? User { get; set; }

    }
}
