
using Application.SignalLogic;
using Infraestructure.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Message.Command
{
    public class CreateMessageCommand : IRequest<Response>
    {
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public string Content { get; set; }
    }

    public class CreateMessageHandler(GenericRepository<Core.Entities.Message> repository,RedSocialContext context) : IRequestHandler<CreateMessageCommand, Response>
    {
        public async Task<Response> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            var message = MapperControl.mapper.Map<Core.Entities.Message>(request); 

            var existingConversation = await context.Conversations
                .FirstOrDefaultAsync(c =>
                    (c.User1Id == message.SenderId && c.User2Id == message.ReceiverId) ||
                    (c.User1Id == message.ReceiverId && c.User2Id == message.SenderId));

            if (message.ReceiverId == message.SenderId)
            {
                return new Response()
                {
                    response = "Los Id no pueden ser lo mismo",
                    Status=StatusCodes.Status406NotAcceptable
                };
            }

            if (existingConversation == null)
            {

                var conversation = new Conversation
                {
                    User1Id = message.SenderId,
                    User2Id = message.ReceiverId
                };

                await context.AddAsync(conversation);
                await context.SaveChangesAsync();

                message.ConversationId = conversation.Id;
            }
            else
            {
                message.ConversationId = existingConversation.Id;
                message.Sender = existingConversation.User1;
            }

            var response = await repository.Create(message);
            
            return response;
        }
    }

}






