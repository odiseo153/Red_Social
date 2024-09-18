using Infraestructure.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace Infraestructure.Repository
{
    public class UserRepository(RedSocialContext context, UserManager<User> manager) 
    {
        public async Task<Response> Create(User Entity)
        {
           var result = await manager.CreateAsync(Entity,Entity.PassWord ?? "Odiseo1234");

           if(!result.Succeeded)
            {
                return new Response()
                {
                    Error = result.Errors,
                    Status = StatusCodes.Status500InternalServerError,
                    HasFail = true
                };
            }

            return new Response() { 
              response = Entity,
            };
        }
         
        public bool Delete(Guid Id)
        {
           var user  = context.Users.FirstOrDefault(x => x.Id == Id);

            if (user == null)
            {
                return false;
            }

            context.Users.Remove(user);
            context.SaveChanges();

            return true;
        }

        public async Task<Response> Get(string id = null, Expression<Func<User, bool>> conditions = null, Expression<Func<User, object>> includes = null)
        {
            // Construir la consulta base
            IQueryable<User> query = context.Users.AsNoTracking();

            // Aplicar condiciones si se proporcionan
            if (conditions != null)
            {
                query = query.Where(conditions);
            }

            // Aplicar inclusiones si se proporcionan
            if (includes != null)
            {
                query = query.Include(includes);
            }

            // Aplicar filtro por ID si se proporciona
            if (!string.IsNullOrEmpty(id) && Guid.TryParse(id, out var guidId))
            {
                query = query.Where(x => x.Id == guidId);
            }

            // Proyectar los resultados a la nueva forma
            var usuarios = await query.Select(x => new
            {
                imagen =x.Imagen,
                posts = x.Posts.Count,
                followers = x.Followers.Count,
                following = x.Following.Count,
                id = x.Id,
                userName = x.UserName,
                email = x.Email,
                normalizedEmail = x.NormalizedEmail ?? "ODISEORINCON@GMAIL.COM",
                phoneNumber = x.PhoneNumber ?? "8297890761",
            }).ToListAsync();

            return new Response()
            {
                response = id != null ? usuarios.FirstOrDefault(x => x.id == Guid.Parse(id)) : usuarios,
            };
        }

        public Response GetUsers()
        {
            var usuarios = context.Users.Select(x => new
            {
                x.Id,
                nombre = x.UserName,
                imagen = x.Imagen
            });


            return new Response()
            {
                response = usuarios
            };
        }




        public async Task<Response> Update(User entidad)
        {
            var entida = await context.Users.FindAsync(entidad.Id);

            foreach (var propiedad in entidad.GetType().GetProperties())
            {
                var valorEntidad = propiedad.GetValue(entidad);
                var valorFinal = valorEntidad ?? propiedad.GetValue(entida);

                propiedad.SetValue(entida, valorFinal);
            }

            await context.SaveChangesAsync();

            return new Response()
            {
                response = entidad
            };
        }
    }
}
