using Application.Users.Command;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users.Validation
{
    public class CreateUserValidation : AbstractValidator<CreateUserCommand>
    {

        public CreateUserValidation() 
        {
            RuleFor(x => x.Email)
                    .EmailAddress()
                    .NotEmpty()
                    .NotNull();

            RuleFor(x => x.UserName)
                    .NotEmpty()
                    .NotNull()
                    .MinimumLength(3);

            RuleFor(x => x.PassWord)
                    .MinimumLength(4)
                    .NotEmpty()
                    .NotNull();

         

        }
    }
}
