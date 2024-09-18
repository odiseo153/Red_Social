using Application.Posts.Validation;
using Microsoft.AspNetCore.Http;

namespace Application.Comment.Command
{
    public class CreatePostCommand : IRequest<Response>
    {
        public string Content { get; set; }
        public Guid UserId { get; set; }
    }

    public class CreatePostHandler(PostRepository repository) : IRequestHandler<CreatePostCommand, Response>
    {
        public async Task<Response> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            var validation =await new CreatePostValidation().ValidateAsync(request);

            if (!validation.IsValid) 
            {
                return new Response() 
                {
                response = validation.Errors,
                HasFail = true,
                Status = StatusCodes.Status406NotAcceptable
                };
            }

            var post = MapperControl.mapper.Map<Post>(request);
            var response =await repository.Create(post);

            return response;
        }
    }

}
