namespace UserDataappCore.Api.Models
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}
