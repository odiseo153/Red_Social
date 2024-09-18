using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.JWT
{
    public class Token
    {
        public static string llave = "odiseo esta probando odiseo esta probando odiseo esta probando odiseo esta probando odiseo esta probando odiseo esta probando odiseo esta probando";
      
        public static string TokenGenerator(User user)
        {

            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
            // Agrega más Claims según sea necesario
        };

            // Genera la clave utilizando el algoritmo HmacSha256
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(llave));

            // Crea las credenciales usando la clave y el algoritmo
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);



            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds
            );


            // Convierte el token en una cadena
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
