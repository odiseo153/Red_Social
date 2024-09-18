using Application.UsersFolllower.Command;
using Application.UsersFolllower.Query;
using Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api_Red_Social.Controllers
{
    [ApiController]
    [Route("Follow")]
    public class UserFollowerController(IMediator mediator) : Controller
    {
        [HttpPost]
        public async Task<Response> Create(CreateUserFollowerCommand following)
        {
            return await mediator.Send(following);
        }

        [HttpGet("{Id}")]
        public async Task<Response> GetUsers(Guid Id)
        {
            return await mediator.Send(new GetFollowersUserQuery(Id));
        }

        [HttpDelete("{Id}")]
        public async Task<bool> Delete(Guid Id)
        {
            return await mediator.Send(new DeleteUserFollowerCommand(Id));
        }
    }
}






