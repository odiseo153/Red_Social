

using Infraestructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infraestructure.Repository
{
    public class CommentsRepository(RedSocialContext context) 
    {
        public async Task<Response> Get(string IdPublicacion = null)
        {
            IQueryable<Comment> comentarios = context.Comments;



            var commentsQuery = comentarios.Select(x => new
            {
                x.Id,
                UserName = x.User.UserName ?? "Username not provided",
                Content = x.Content ?? "Content not available",
                Imagen = x.User.Imagen ?? "DefaultImagePath.jpg",
                postId = x.PostId
            }).Where(x => x.postId == Guid.Parse(IdPublicacion));

            /*
            if (Id != null)
            {
                var comment = await commentsQuery.FirstOrDefaultAsync(x => x.postId == Guid.Parse(Id));
                return new Response
                {
                    response = comment
                };
            }
            */
            var commentsList = await commentsQuery.ToListAsync();

            return new Response
            {
                response = commentsList
            };

        }

        public Task<Response> Update(BaseEntity Entity)
        {
            throw new NotImplementedException();
        }
    }
}






