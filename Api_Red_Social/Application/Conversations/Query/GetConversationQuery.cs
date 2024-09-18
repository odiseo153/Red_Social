

namespace Application.Conversations.Query
{
    public class GetConversationQuery(Guid receiverId) : IRequest<Response>
    {
        public Guid receiverId { get; set; } = receiverId;
    }

    public class GetConversationHandler(ConversationRepository repository) : IRequestHandler<GetConversationQuery, Response>
    {
        public Task<Response> Handle(GetConversationQuery request, CancellationToken cancellationToken)
        {
            var response = repository.GetConversation(request.receiverId);

            return response;
        }
    }
}
