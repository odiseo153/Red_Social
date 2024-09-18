using System.Linq.Expressions;


namespace Application.Users.Query
{
    public class GetUsersQuery(string id = null, Expression<Func<User, object>> include = null, Expression<Func<User, bool>> condition = null) : IRequest<Response>
    {
        public string Id { get; set; } = id;
        public Expression<Func<User,bool>> condition { get; set; } = condition;
        
        public Expression<Func<User, object>> includes = include;

    }

    public class GetUsersHandler(UserRepository repository) : IRequestHandler<GetUsersQuery, Response>
    {
        public async Task<Response> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var response = await repository.Get(request.Id,request.condition,request.includes);

            return response;
        }
    }
}

