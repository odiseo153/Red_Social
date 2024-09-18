


namespace Application.Users.Command
{
    public class UpdateUserCommand : CreateUserCommand,IRequest<Response> 
    {
        public string Id { get; set; }
        public string? UserName { get; set; }

        public string? Email { get; set; }
        public string? bio { get; set; }
        public string? Imagen { get; set; }
        public string? PassWord { get; set; }
    }

    public class UpdateUserHandler(UserRepository repository) : IRequestHandler<UpdateUserCommand, Response>
    {
        public async Task<Response> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = MapperControl.mapper.Map<User>(request);
            var response = await repository.Update(user);


            return response;
        }
    }
}
