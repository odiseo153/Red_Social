


using Infraestructure.Context;

namespace Application.UsersFolllower.Command
{
    public class CreateUserFollowerCommand : IRequest<Response>
    {
        public Guid FollowerId { get; set; }

        public Guid FollowingId { get; set; }
    }

    public class CreateUserFollowerHandler(RedSocialContext context,GenericRepository<UserFollower> repository) : IRequestHandler<CreateUserFollowerCommand, Response>
    {
        async Task<Response> IRequestHandler<CreateUserFollowerCommand, Response>.Handle(CreateUserFollowerCommand request, CancellationToken cancellationToken)
        {
            var follow = MapperControl.mapper.Map<UserFollower>(request);

            var existe = context.UserFollowers.Where(x => x.FollowerId == request.FollowerId & x.FollowingId == request.FollowingId);

          
            if (existe.Any() || follow.FollowerId == follow.FollowingId)
            {
                return new Response()
                {
                    response = "Ya existe esa relacion o no se puede hacer esa relacion",
                    HasFail = true
                };
            }

            var response = await repository.Create(follow);

            return response;
        }
    }
}
