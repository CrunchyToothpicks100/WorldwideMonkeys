using System.ComponentModel.DataAnnotations;

namespace UserDataappCore.Api.Models
{
    public class MonkeyDesign
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Head {  get; set; }

        [Required]
        public string Body {  get; set; }

        [Required]
        public string[] Eyes { get; set; }

        [Required]
        public string[] Ears { get; set; }

        [Required]
        public string[] Arms { get; set; }

        [Required]
        public string[] Legs { get; set; }

        [Required]
        public string[] Feet { get; set; }
    }
}
