using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace HMS.Data.Models
{
    public partial class Expense
    {
        public int ExpenseId { get; set; }
        public DateTime Date { get; set; }
        public int? ServiceId { get; set; }
        public int? HouseId { get; set; }
        public double? Quantity { get; set; }

        [JsonIgnore]
        public virtual House House { get; set; }
        public virtual Service Service { get; set; }
    }
}
