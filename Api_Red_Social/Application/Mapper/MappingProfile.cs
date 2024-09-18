using Application.Comment.Command;
using Application.Comments.Command;
using Application.Likes.Command;
using Application.Message.Command;
using Application.Users.Command;
using Application.UsersFolllower.Command;
using AutoMapper;
using Core.Entities;

namespace Application.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
          CreateMap<UpdateUserCommand, User>().ReverseMap();
          CreateMap<CreateCommentsCommand, Core.Entities.Comment>().ReverseMap();
          CreateMap<CreateUserCommand, User>().ReverseMap();
            CreateMap<CreateUserFollowerCommand, UserFollower>().ReverseMap();

            CreateMap<CreatePostCommand,Post>().ReverseMap();
          CreateMap<CreateLikeCommand, Like>().ReverseMap();
          CreateMap<CreateMessageCommand,Core.Entities.Message >().ReverseMap();

        }
    }
}
