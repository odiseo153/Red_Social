using Application.Comment.Command;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Posts.Validation
{
    public class CreatePostValidation : AbstractValidator<CreatePostCommand>
    {
        public CreatePostValidation() {

            RuleFor(x => x.Content)
                    .NotEmpty()
                    .NotNull()
                    .MinimumLength(3);


        }
    }
}
