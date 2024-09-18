
using System.Linq.Expressions;


namespace Application.GenericsQuery
{
    public class GetDataQuery<T>(string id = null, Expression<Func<T, object>>[] include = null, Expression<Func<T, bool>> condition = null) : IRequest<Response> where T : class
    {
        public string Id { get; set; } = id;
        public Expression<Func<T, bool>> condition { get; set; } = condition;

        public Expression<Func<T, object>>[] includes = include;

    }

    public class GetDataHandler<T>(GenericRepository<T> repository) : IRequestHandler<GetDataQuery<T>, Response> where T : class
    {
        public async Task<Response> Handle(GetDataQuery<T> request, CancellationToken cancellationToken)
        {
            var response = await repository.Get(request.Id, request.condition, request.includes);

            return response;
        }
    }
}
