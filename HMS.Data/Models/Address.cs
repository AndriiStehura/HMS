using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace HMS.Data.Models
{
    public partial class Address
    {
        public Address()
        {
            Houses = new HashSet<House>();
            Providers = new HashSet<Provider>();
        }

        public int AddressId { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string BuildingNumber { get; set; }

        [JsonIgnore]
        public virtual ICollection<House> Houses { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<Provider> Providers { get; set; }
    }
}
