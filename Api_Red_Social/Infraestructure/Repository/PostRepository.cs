using Infraestructure.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace Infraestructure.Repository
{
    public class PostRepository(RedSocialContext context) 
    {
        public async Task<Response> Create(Post Entity)
        {
           await  context.Posts.AddAsync(Entity);
           await  context.SaveChangesAsync();

            return new Response()
            {
                response = Entity
            };
        }

        public bool Delete(Guid Id)
        {
            throw new NotImplementedException();
        }

        public async Task<Response> Get(string Id = null, string userId = null,bool general = true)
        {
            string imagenEjemplo = "https://i.pinimg.com/564x/97/82/48/97824848eef8fc5d328c23de31fbda66.jpg";

            var publicaciones = context.Posts.
                Select(x => new 
            {
                 x.Id,
                 nombreUser = x.User.UserName ?? "userName vacio",
                 imagen = x.User.Imagen ?? imagenEjemplo,
                 user = "@"+x.User.UserName,
                 contenido = x.Content ?? "contenido vacio",
                 likes = x.Likes.Count,
                 comentarios = x.Comments.Select(c => new
                    {
                        c.Id,
                        UserName = c.User.UserName ?? "Username not provided",
                        Content = c.Content ?? "Content not available",
                        Imagen = c.User.Imagen ?? "DefaultImagePath.jpg",

                    }),
                    comments = x.Comments.Count,
                 likedByUser =  x.Likes.Any(like => like.UserId == Guid.Parse(userId))
                });

            var publicacionesUser = context.Posts.Where(x => x.UserId == Guid.Parse(userId)).
                Select(x => new
                {
                    x.Id,
                    nombreUser = x.User.UserName ?? "userName vacio",
                    imagen = x.User.Imagen ?? imagenEjemplo,
                    user = "@" + x.User.UserName,
                    contenido = x.Content ?? "contenido vacio",
                    likes = x.Likes.Count,
                    comments = x.Comments.Count,
                    comentarios = x.Comments.Select(c => new
                    {
                        c.Id,
                        UserName = x.User.UserName ?? "Username not provided",
                        Content = x.Content ?? "Content not available",
                        Imagen = x.User.Imagen ?? "DefaultImagePath.jpg",

                    }),
                    likedByUser = x.Likes.Any(like => like.UserId == Guid.Parse(userId)),

                });

            if (Id != null)
            {
                var response = await publicaciones.FirstOrDefaultAsync(x => x.Id == Guid.Parse(Id));

                return new Response
                {
                    response = response
                };

            }

            return new Response
            {
                response =general ? await publicaciones.ToListAsync() : await publicacionesUser.ToListAsync(),
                HasFail = false,
                Status = StatusCodes.Status200OK
            };
        }

        public Task<Response> Update(BaseEntity Entity)
        {
            throw new NotImplementedException();
        }
    }
}
