

using System.Linq.Expressions;

namespace Application.Comments.Query
{
    public class GetCommentsQuery (string id = null) : IRequest<Response> 
    {
        public string Id { get; set; } = id;
    }

    public class GetCommentsHandler(CommentsRepository repository) : IRequestHandler<GetCommentsQuery, Response>
    {
        public async Task<Response> Handle(GetCommentsQuery request, CancellationToken cancellationToken)
        {
            var response = await repository.Get(request.Id);
           return response;
        }
    }
}
