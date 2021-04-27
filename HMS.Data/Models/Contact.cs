using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace HMS.Data.Models
{
    public partial class Contact
    {
        public Contact()
        {
            Providers = new HashSet<Provider>();
            Settlers = new HashSet<Settler>();
        }

        public int ContactsId { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public virtual ICollection<Provider> Providers { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<Settler> Settlers { get; set; }
    }
}
