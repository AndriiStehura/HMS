using System;
using System.Collections.Generic;

#nullable disable

namespace HMS.Data.Models
{
    public partial class Settler
    {
        public int PersonId { get; set; }
        public int FlatNumber { get; set; }
        public double? FlatArea { get; set; }
        public int? ContactId { get; set; }

        public virtual Contact Contact { get; set; }
        public virtual Person Person { get; set; }
    }
}
