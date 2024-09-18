

using Infraestructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infraestructure.Repository
{
    public class UserFollowerRepository(RedSocialContext context)
    {
        public async Task<Response> GetFollowers(Guid Id)
        {
            var followers = context.Users.Select(x => new
            {
                x.Id,
                Followers = x.Followers.Select(p => new
                {
                    p.Id,
                    userId = p.Follower.Id,
                    p.Follower.Imagen,
                    p.Follower.UserName
                }),

                Following = x.Following.Select(p => new
                {
                  p.Id,
                  userId = p.Following.Id,
                  p.Following.Imagen,
                  p.Following.UserName
                }),

                })
                .FirstOrDefault(c => c.Id == Id);

            return new Response()
            {
                response = followers 
            };
        }

        public async Task<bool> Delete(Guid Id)
        {
            var entity =await context.UserFollowers.FirstOrDefaultAsync(x => x.Id==Id);

            if (entity == null)
            {
                return false;
            }

            context.Remove(entity);
          await context.SaveChangesAsync();

            return true;
        }

    }
}
