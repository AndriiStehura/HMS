using HMS.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace HMS.Data.Transfer
{
    public class ProviderDTO
    {
        public int ProviderId { get; set;}
        public string Name { get; set; }
        public Address Address { get; set; }
        public ContactsDTO Contacts { get; set; }
        public IEnumerable<Service> Services { get; set; }
    }
}
