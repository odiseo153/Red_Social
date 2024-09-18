

namespace Application.Likes.Command
{
    public class CreateLikeCommand : IRequest<Response>
    {
        public Guid PostId { get; set; }

        public Guid UserId { get; set; }
    }

    public class CreateLikeHandler(GenericRepository<Like> repository) : IRequestHandler<CreateLikeCommand, Response>
    {
        public async Task<Response> Handle(CreateLikeCommand request, CancellationToken cancellationToken)
        {
            var like = MapperControl.mapper.Map<Like>(request);
            var response = await repository.Create(like);

            return response;
        }
    }
}
