

namespace Application.Users.Query
{
    public class GetUsersSelectQuery : IRequest<Response>
    {

    }

    public class GetUsersSelectHandler(UserRepository repository) : IRequestHandler<GetUsersSelectQuery, Response>
    {
        public async Task<Response> Handle(GetUsersSelectQuery request, CancellationToken cancellationToken)
        {
            var response = repository.GetUsers();

            return response;
        }
    }
}
