using Infraestructure.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Text.Json;
using System.Text.Json.Serialization;



namespace Infraestructure.Repository
{
    public class GenericRepository<T>(RedSocialContext context) : IGenericMethods<T> where T : class
    {
        public async Task<Response> Create(T Entity)
        {
            await context.Set<T>().AddAsync(Entity);
            await context.SaveChangesAsync();

            return new Response
            {
                response = Entity
            };
        }

        public bool Delete(Guid Id) 
        {
            var entity = context.Set<T>().Find(Id);

            if (entity == null)
            {
                return false;
            }

            context.Remove(entity);
            context.SaveChanges();

            return true;
        }

        public async Task<Response> Get(string Id = null, Expression<Func<T, bool>> conditions = null, Expression<Func<T, object>>[] includes = null)
        {
            IQueryable<T> query = context.Set<T>();

        
            if (!string.IsNullOrEmpty(Id))
            {
                var param = Expression.Parameter(typeof(T), "x");
                var idProperty = typeof(T).GetProperty("Id");

                var idValue = Expression.Constant(Guid.Parse(Id), typeof(Guid));
                var idCondition = Expression.Equal(Expression.Property(param, idProperty), idValue);

                var lambda = Expression.Lambda<Func<T, bool>>(idCondition, param);
                query = query.Where(lambda);
            }

            if (includes != null)
            {
                foreach (var include in includes)
                {
                query = query.AsNoTracking().Include(include);    
                }
            }

            if (conditions != null)
            {
                query = query.Where(conditions);
            }


            string json = JsonSerializer.Serialize(await query.ToListAsync(), new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles
            });

          
            var entities = await query.ToListAsync();

            if (!entities.Any())
            {
                return new Response
                {
                    Error = "No entities found in the database",
                    HasFail = true,
                    Status = StatusCodes.Status404NotFound
                };
            }

            return new Response
            {
                response = includes == null ? entities : json,
                HasFail = false,
                Status = StatusCodes.Status200OK
            };
        }



        public async Task<Response> Update(BaseEntity entidad)
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
