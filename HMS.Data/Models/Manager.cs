using System;
using System.Collections.Generic;

#nullable disable

namespace HMS.Data.Models
{
    public partial class Manager
    {
        public int PersonId { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public virtual Person Person { get; set; }
    }
}
