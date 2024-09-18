

namespace Application.Likes.Command
{
    public class DeleteLikeCommand(string id) : IRequest<bool>
    {
        public string Id { get; set; } = id;
    }

    public class DeleteLikeHandler(GenericRepository<Like> repository) : IRequestHandler<DeleteLikeCommand, bool>
    {
        public async Task<bool> Handle(DeleteLikeCommand request, CancellationToken cancellationToken)
        {
            var response =  repository.Delete(Guid.Parse(request.Id));

            return response;

        }
    }
}




