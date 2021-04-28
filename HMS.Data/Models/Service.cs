using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HMS.Data.Models
{
    public partial class Service
    {
        public int ServiceId { get; set; }
        public decimal Price { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Measurement { get; set; }
        public int? ProviderId { get; set; }

        [JsonIgnore]
        public virtual IEnumerable<Expense> Expenses { get; set; }
        [JsonIgnore]
        public virtual Provider Provider { get; set; }
    }
}
