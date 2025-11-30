namespace UserDataappCore.Api.Models
{
    public class MonkeyDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Continent { get; set; }
        public required string Type { get; set; }
        public required string Info { get; set; }
        public required string Username { get; set; } // from the associated User
    }
}
