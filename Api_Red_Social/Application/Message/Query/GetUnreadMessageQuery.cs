

namespace Application.Message.Query
{
    public class GetUnreadMessageQuery(string recibidor) : IRequest<Response>
    {
        public string receiverId { get; set; } = recibidor;

    }

    public class GetUnreadMessageHandler(MessageRepository repository) : IRequestHandler<GetUnreadMessageQuery, Response>
    {
        public Task<Response> Handle(GetUnreadMessageQuery request, CancellationToken cancellationToken)
        {
            var response = repository.GetUnreadMessages(request.receiverId);

            return response;    
        }
    }
}





