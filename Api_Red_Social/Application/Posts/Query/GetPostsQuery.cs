

using System.Linq.Expressions;

namespace Application.Posts.Query
{
    public class GetPostsQuery(string id = null, string userid = null,bool general =true) : IRequest<Response>
    {
        public string Id { get; set; } = id;
        public string userId { get; set; } = userid;
        public bool general { get; set; } = general;


    }

    public class GetPostHandler(PostRepository repository) : IRequestHandler<GetPostsQuery, Response>
    {
        public async Task<Response> Handle(GetPostsQuery request, CancellationToken cancellationToken)
        {
            var response = await repository.Get(request.Id, request.userId,request.general);

            return response;
        }
    }
}


