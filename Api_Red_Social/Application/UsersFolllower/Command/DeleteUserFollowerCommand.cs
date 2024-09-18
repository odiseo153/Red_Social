

namespace Application.UsersFolllower.Command
{
    public class DeleteUserFollowerCommand(Guid Id) : IRequest<bool>
    {
        public Guid Id { get; set; } = Id;
    }

    public class DeleteUserFollowerHandler(UserFollowerRepository repository) : IRequestHandler<DeleteUserFollowerCommand, bool>
    {
        public async Task<bool> Handle(DeleteUserFollowerCommand request, CancellationToken cancellationToken)
        {
            var response =await repository.Delete(request.Id);

            return  response;
        }
    }
}
