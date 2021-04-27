using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace HMS.Data.Models
{
    public partial class Person
    {
        public Person()
        {
            Payments = new HashSet<Payment>();
        }

        public int PersonId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int HouseId { get; set; }

        public virtual House House { get; set; }

        [JsonIgnore]
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
