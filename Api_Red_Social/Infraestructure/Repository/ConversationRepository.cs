

using Core.Entities;
using Infraestructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infraestructure.Repository
{
    public class ConversationRepository(RedSocialContext context)
    {
        public async Task<Response> GetConversation(Guid conversationId)
        {
            if (conversationId == Guid.Empty)
            {
                return new Response()
                {
                    response = "Invalid conversation ID",
                };
            }

            try
            {
                var messages = await context.Messages
                    .AsNoTracking()
                    .Where(m => m.ConversationId == conversationId)
                    .OrderBy(m => m.Timestamp)
                    .Select(m => new 
                    {
                        m.Sender.UserName,
                        m.Content,
                        m.ReceiverId,
                        m.SenderId,
                        m.Timestamp,
                    })
                    .ToListAsync();

                if (messages == null || messages.Count == 0)
                {
                    return new Response()
                    {
                        response = "No messages found for the given conversation ID",
                    };
                }

                await context.Messages
                    .Where(x => x.ConversationId == conversationId && !x.IsRead)
                    .ExecuteUpdateAsync(i => i.SetProperty(p => p.IsRead, true));

                return new Response()
                {
                    response = messages,
                };
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework)
                return new Response()
                {
                    response = $"An error occurred: {ex.Message}",
                };
            }
        }



    }
}
