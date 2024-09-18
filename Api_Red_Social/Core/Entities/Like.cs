using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Like : BaseEntity
    {     
        public Guid PostId { get; set; }
        public Post Post { get; set; }
 
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
