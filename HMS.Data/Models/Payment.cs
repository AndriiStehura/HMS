using System;
using System.Text.Json.Serialization;

namespace HMS.Data.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int? PersonId { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }
    }
}
