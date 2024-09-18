using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string Imagen { get; set; }
        public string PassWord { get; set; }
        public string bio { get; set; }

        public ICollection<Post> Posts { get; set; }

        public ICollection<UserFollower> Followers { get; set; }

        public ICollection<UserFollower> Following { get; set; }
    }
}






