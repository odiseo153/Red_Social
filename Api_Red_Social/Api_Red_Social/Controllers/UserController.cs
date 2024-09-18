using Application.Authentication;
using Application.Users.Command;
using Application.Users.Query;
using Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace Api_Red_Social.Controllers
{
    [ApiController]
    [Route("User")]
    //[Authorize]
    public class UserController(IMediator mediator) : Controller
    {

        [AllowAnonymous]
        [HttpGet]
        public async Task<Response> Get()
        {          
            return await mediator.Send(new GetUsersQuery());
        }

        [HttpGet("Token")]
        public string Token()
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            return token;
        }

        [HttpGet("/{id}")]
        public async Task<Response> Get(string id)
        {
            return await mediator.Send(new GetUsersQuery(id));
        }

        [HttpGet("/Users")]
        public async Task<Response> GetUsers()
        {
            return await mediator.Send(new GetUsersSelectQuery());
        }

        [HttpPost]
        public async Task<Response> Crear(CreateUserCommand user)
        {
            return await mediator.Send(user);
        }

        [HttpPut]
        public async Task<Response> Update(UpdateUserCommand user)
        {
            return await mediator.Send(user);
        }

        [AllowAnonymous]
        [HttpPost("/Login")]
        
        public async Task<Response> Login(LoginCommand login)
        {
            var response = await mediator.Send(login);


            return response;
        }
    }
}






