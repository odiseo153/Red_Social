using Application.Authentication;
using Application.Comment.Command;
using Application.Comments.Command;
using Application.Comments.Query;
using Application.Conversations.Query;
using Application.GenericsQuery;
using Application.Likes.Command;
using Application.Message.Command;
using Application.Message.Query;
using Application.Posts.Query;
using Application.SignalLogic;
using Application.Users.Command;
using Application.Users.Query;
using Application.UsersFolllower.Command;
using Application.UsersFolllower.Query;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class ServiceRegistration
    {
        public static void AddApplication(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddSignalR();
            services.AddScoped<ChatHub>();


            services.AddScoped<IRequestHandler<GetUsersQuery, Response>, GetUsersHandler>();
            services.AddScoped<IRequestHandler<CreateUserCommand, Response>, CreateUserHandler>();
            services.AddScoped<IRequestHandler<LoginCommand, Response>, LoginHandler>();

            services.AddScoped<IRequestHandler<GetDataQuery<User>, Response>, GetDataHandler<User>>();
            services.AddScoped<IRequestHandler<GetDataQuery<Core.Entities.Message>, Response>, GetDataHandler<Core.Entities.Message>>();
            services.AddScoped<IRequestHandler<GetPostsQuery, Response>, GetPostHandler>();
            services.AddScoped<IRequestHandler<GetUsersQuery, Response>, GetUsersHandler>();
            services.AddScoped<IRequestHandler<GetDataQuery<Like>, Response>, GetDataHandler<Like>>();
            services.AddScoped<IRequestHandler<GetCommentsQuery, Response>, GetCommentsHandler>();
            services.AddScoped<IRequestHandler<GetUsersSelectQuery, Response>, GetUsersSelectHandler>();
            services.AddScoped<IRequestHandler<GetConversationQuery, Response>, GetConversationHandler>();
            services.AddScoped<IRequestHandler<GetFollowersUserQuery, Response>, GetFollowersUserHandler>();
            services.AddScoped<IRequestHandler<DeleteUserFollowerCommand, bool>, DeleteUserFollowerHandler>();

            services.AddScoped<IRequestHandler<CreateCommentsCommand, Response>, CreateCommentsHandler>();
            services.AddScoped<IRequestHandler<CreatePostCommand, Response>, CreatePostHandler>();
            services.AddScoped<IRequestHandler<CreateUserFollowerCommand, Response>, CreateUserFollowerHandler>();

            services.AddScoped<IRequestHandler<CreateLikeCommand,Response>,CreateLikeHandler>();
            services.AddScoped<IRequestHandler<DeleteLikeCommand, bool>, DeleteLikeHandler>();
            services.AddScoped<IRequestHandler<UpdateUserCommand,Response>,UpdateUserHandler>();

            services.AddScoped<IRequestHandler<CreateMessageCommand, Response>, CreateMessageHandler>();
            services.AddScoped<IRequestHandler<GetUnreadMessageQuery, Response>, GetUnreadMessageHandler>();
            services.AddScoped<IRequestHandler<GetStartMessageQuery, Response>, GetStartMessageHandler>();
            services.AddScoped<IRequestHandler<MarkMessageReadQuery, bool>, MarkMessageReadHandler>();


        }

    }
}
