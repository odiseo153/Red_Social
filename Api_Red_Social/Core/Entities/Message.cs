

using Microsoft.VisualBasic;

namespace Core.Entities
{
    public class Message : BaseEntity
    {
        public Guid ConversationId { get; set; }
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public virtual User Sender { get; set; }
        public virtual User Receiver { get; set; }
        public virtual Conversation Conversation { get; set; }

    }

}
