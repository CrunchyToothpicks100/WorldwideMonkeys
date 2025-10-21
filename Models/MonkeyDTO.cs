namespace UserDataappCore.Api.Models
{
    public class MonkeyDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Continent { get; set; }
        public string Type { get; set; }
        public string Info { get; set; }
        public string Username { get; set; } // from the associated User
    }
}
