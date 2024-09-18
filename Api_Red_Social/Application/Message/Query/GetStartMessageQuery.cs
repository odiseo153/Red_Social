

namespace Application.Message.Query
{
    public class GetStartMessageQuery(string recivedId) : IRequest<Response>
    {
        public string recivedId { get; set; } = recivedId;
    }

    public class GetStartMessageHandler(MessageRepository repository) : IRequestHandler<GetStartMessageQuery, Response>
    {
        public async Task<Response> Handle(GetStartMessageQuery request, CancellationToken cancellationToken)
        {
            var mensajes = await repository.MensajeEntrada(request.recivedId);

            return mensajes;
        }
    }
}



