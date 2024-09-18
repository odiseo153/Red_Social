using Infraestructure.Context;
using Microsoft.EntityFrameworkCore;


namespace Infraestructure.Repository
{
    public class MessageRepository(RedSocialContext context) 
    {

        public async Task<Response> MensajeEntrada(string receivedId)
        {
            if (!Guid.TryParse(receivedId, out var receivedGuid))
            {
                return new Response { response = "Invalid GUID format" };
            }

            try
            {

                var mensajes = await context.Messages
                    .Where(m => m.ReceiverId == receivedGuid || m.SenderId == receivedGuid)
                    .OrderBy(m => m.Timestamp)
                    .Select(m => new
                    {
                        userName = m.SenderId == receivedGuid ? m.Receiver.UserName : m.Sender.UserName,
                        UserId = m.SenderId == receivedGuid ? m.Receiver.Id : m.Sender.Id,
                        m.Content,
                        imagen = m.SenderId == receivedGuid ? m.Receiver.Imagen : m.Sender.Imagen,
                        m.Id,
                        m.IsRead,
                        m.ConversationId,
                        m.Timestamp,
                    })
                    .ToListAsync();

                return new Response
                {
                    response = mensajes,
                };
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework)
                return new Response
                {
                    response = $"An error occurred: {ex.Message}",
                };
            }
        }


        public async Task<Response> GetUnreadMessages(string id)
        {
            var messages = await context.Messages
                                         .Where(m => m.Id == Guid.Parse(id) && !m.IsRead )
                                         .ToListAsync();

            return new Response()
            {
                response = messages
            };
        }

        public async Task<bool> MarkMessagesAsRead(string receiverId)
        {
            try
            {

            var messages = await context
                    .Messages
                    .Where(m => m.ReceiverId == Guid.Parse(receiverId) && !m.IsRead)
                    .ToListAsync();

            foreach (var message in messages)
            {
                message.IsRead = true;
            }

            await context.SaveChangesAsync();

             return true;
            }catch (Exception ex)
            {
                return false;
            }
        }
    }
}
