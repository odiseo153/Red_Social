using Infraestructure.Context;
using Microsoft.AspNetCore.SignalR;

namespace Application.SignalLogic
{
    public class ChatHub(RedSocialContext context) : Hub
    {
        public async Task<Response> SendMessage(Core.Entities.Message message)
        {
            await context.Messages.AddAsync(message);
            await context.SaveChangesAsync();

            await Clients.Client(message.ReceiverId.ToString()).SendAsync("ReceiveMessage", message.Content);

            return new Response()
            {
                response = message
            };
        }
    }
}
