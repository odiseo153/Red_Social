using Application.Likes.Command;
using Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Api_Red_Social.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("Like")]
    public class LikeController(IMediator mediador) : Controller
    {
        [HttpPost]
        public async Task<Response> Create(CreateLikeCommand like)
        {
            return await mediador.Send(like);
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            return await mediador.Send(new DeleteLikeCommand(id));
        }


    }
}



