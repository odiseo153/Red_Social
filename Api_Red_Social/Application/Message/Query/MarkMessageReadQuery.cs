


namespace Application.Message.Query
{
    public class MarkMessageReadQuery(string recibidor) : IRequest<bool>
    {
        public string receiverId { get; set; } = recibidor;
    }

    public class MarkMessageReadHandler(MessageRepository repository) : IRequestHandler<MarkMessageReadQuery, bool>
    {
        public Task<bool> Handle(MarkMessageReadQuery request, CancellationToken cancellationToken)
        {
            var response = repository.MarkMessagesAsRead(request.receiverId);

            return response;
        }
    }
}
