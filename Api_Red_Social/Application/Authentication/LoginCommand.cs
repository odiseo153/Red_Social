using Infraestructure.Context;
using Infraestructure.JWT;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Authentication
{
    public class LoginCommand : IRequest<Response>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginHandler(RedSocialContext context,UserManager<User> userManager) : IRequestHandler<LoginCommand, Response>
    {
        public async Task<Response> Handle(LoginCommand request, CancellationToken cancellationToken)
        {



            var user =  context.Users.FirstOrDefault(x=> x.Email == request.Email);

            if (user == null)
            {
                return new Response()
                {
                    Error = "No existe Usuario con ese Email",
                    Status = StatusCodes.Status404NotFound,
                    HasFail = true
                };
            }

            var result = await context.Users.FirstOrDefaultAsync(x => x.Email.Equals(request.Email) && x.PassWord.Equals(request.Password));

            if (result == null)
            {
                return new Response()
                {
                    Error = "Contraseña Incorrecta",
                    Status = StatusCodes.Status404NotFound,
                    HasFail = true
                };
            }
            var token = Token.TokenGenerator(user);


            return new Response()
            {
                response = new
                {
                    id=user.Id,
                    token
                },
            };

        }
    }
}
