using Application.Comments.Command;
using Application.Comments.Query;
using Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api_Red_Social.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("Comments")]
    public class CommentsController(IMediator mediator) : Controller
    {


        [HttpGet("{Id}")]
        public async Task<Response> CommentsById(string Id)
        {
            return await mediator.Send(new GetCommentsQuery(Id));
        }


        [HttpPost]
        public async Task<Response> Create(CreateCommentsCommand comentario)
        {
            return await mediator.Send(comentario);
        }

    }
}
