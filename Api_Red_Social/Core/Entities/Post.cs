
namespace Core.Entities
{
    public class Post : BaseEntity
    {
        public string Content { get; set; }     
        public Guid UserId { get; set; }
        public User User { get; set; }

        public ICollection<Comment> Comments { get; set; }
        public ICollection<Like> Likes { get; set; }
    }
}
