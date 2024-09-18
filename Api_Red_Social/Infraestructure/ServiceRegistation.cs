using Core.Entities;
using Infraestructure.Context;
using Infraestructure.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infraestructure
{
    public static class ServiceRegistation
    {
        public static void AddRedSocialContext(this IServiceCollection services, IConfiguration configuration)
        {
         
            services.AddDbContext<RedSocialContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("Connection"));
            });

            services.AddHttpContextAccessor();
            services.AddIdentityCore<User>()
            .AddEntityFrameworkStores<RedSocialContext>();

            services.AddTransient<SignInManager<User>>();
            services.AddTransient<UserManager<User>>();



            services.AddScoped<UserRepository>();
            services.AddScoped<PostRepository>();
            services.AddScoped<CommentsRepository>();
            services.AddScoped<MessageRepository>();
            services.AddScoped<ConversationRepository>();
            services.AddScoped<UserFollowerRepository>();


            services.AddScoped<GenericRepository<UserFollower>>();
            services.AddScoped<GenericRepository<Post>>();
            services.AddScoped<GenericRepository<Message>>();
            services.AddScoped<GenericRepository<User>>();
            services.AddScoped<GenericRepository<Like>>();
            services.AddScoped<GenericRepository<Comment>>();

            services.AddScoped(typeof(IGenericMethods<>), typeof(GenericRepository<>));
            //services.AddScoped<DocumentRepository>();


        }

    }
}
