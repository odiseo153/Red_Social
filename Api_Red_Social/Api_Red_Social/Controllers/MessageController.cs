using Application.Conversations.Query;
using Application.GenericsQuery;
using Application.Message.Command;
using Application.Message.Query;
using Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace Api_Red_Social.Controllers
{
    [ApiController]
    [Route("Message")]
    public class MessageController(IMediator mediator) : Controller
    {
        [HttpPost]
        public Task<Response> CreatedMessage(CreateMessageCommand message)
        {
           return mediator.Send(message);
        }

        [HttpGet("start/{receiverId}")]
        public Task<Response> MensajeInicial(string receiverId)
        {
            return mediator.Send(new GetStartMessageQuery(receiverId));
        }

        [HttpGet("conversation/{receiverId}")]
        public Task<Response> GetConversation(Guid receiverId)
        {
            return mediator.Send(new GetConversationQuery(receiverId));
        }

        [HttpGet("{receiverId}")]
        public Task<Response> GetMessages(string receiverId)
        {
            return mediator.Send(new GetUnreadMessageQuery(receiverId));
        }


        [HttpPut("{receiverId}")]
        public Task<bool> MarkMessagesAsRead(string receiverId)
        {
            return mediator.Send(new MarkMessageReadQuery(receiverId));
        }

    }
}
