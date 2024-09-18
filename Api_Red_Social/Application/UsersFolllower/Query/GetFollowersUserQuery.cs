


namespace Application.UsersFolllower.Query
{
    public class GetFollowersUserQuery(Guid Id) : IRequest<Response>
    {
        public Guid Id { get; set; } = Id;

    }

    public class GetFollowersUserHandler(UserFollowerRepository repository) : IRequestHandler<GetFollowersUserQuery, Response>
    {
        public async Task<Response> Handle(GetFollowersUserQuery request, CancellationToken cancellationToken)
        {
            var response =await repository.GetFollowers(request.Id);

            return response;
        }
    }

}
