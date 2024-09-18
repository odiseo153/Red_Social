using Infraestructure;

namespace Application.Users.Command
{
    public class CreateUserCommand : IRequest<Response>
    {
        public string UserName { get; set; }

        public string Email { get; set; }
        public string bio { get; set; }
        public string Imagen { get; set; }
        public string PassWord { get; set; }


    }

    public class CreateUserHandler(IGenericMethods<User> repository) : IRequestHandler<CreateUserCommand, Response>
    {
        public async Task<Response> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var usuario = MapperControl.mapper.Map<User>(request);

            return await repository.Create(usuario);
        }
    }


}
