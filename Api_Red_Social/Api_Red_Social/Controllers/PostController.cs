using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Comment.Command;
using Core.Entities;
using Application.Posts.Query;


namespace Api_Red_Social.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("Post")]
    public class PostController(IMediator mediator) : Controller
    {

        [HttpGet("user/{id}/{general}")]
        public async Task<Response> GetPost(string id,bool general = true)
        {
            return await mediator.Send(new GetPostsQuery(null,id,general));
        }

        [HttpGet("{id}/user/{userid}")]
        public async Task<Response> GetPostById(string id, string userid)
        {
            return await mediator.Send(new GetPostsQuery(id,userid));
        }

        [HttpPost]
        public async Task<Response> CreatePost(CreatePostCommand post)
        {
            return await mediator.Send(post);
        }

      
    }
}
