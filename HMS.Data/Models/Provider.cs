using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace HMS.Data.Models
{
    public partial class Provider
    {
        public Provider()
        {
            Services = new HashSet<Service>();
        }

        public int ProviderId { get; set; }
        public string Name { get; set; }
        public int AddressId { get; set; }
        public int? ContactId { get; set; }

        public virtual Address Address { get; set; }
        public virtual Contact Contact { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<Service> Services { get; set; }
    }
}
