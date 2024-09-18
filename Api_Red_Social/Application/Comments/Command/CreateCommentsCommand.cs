using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Comments.Command
{
    public class CreateCommentsCommand : IRequest<Response>
    {
        public string Content { get; set; }

        public Guid PostId { get; set; }
        public Guid UserId { get; set; }

    }

    public class CreateCommentsHandler(GenericRepository<Core.Entities.Comment> repository) : IRequestHandler<CreateCommentsCommand, Response>
    {
        public async Task<Response> Handle(CreateCommentsCommand request, CancellationToken cancellationToken)
        {
            var comentario = MapperControl.mapper.Map<Core.Entities.Comment>(request);
            var response = await repository.Create(comentario);

            return response;
        }
    }
}
