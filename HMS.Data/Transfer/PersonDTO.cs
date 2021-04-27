using HMS.Data.Models;
using System.Collections.Generic;

namespace HMS.Data.Transfer
{
    public class PersonDTO
    {
        public int PersonId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int HouseId { get; set; }
        public int FlatNumber { get; set; }
        public double? FlatArea { get; set; }
        public ContactsDTO Contacts { get; set; }
        public IEnumerable<Payment> Payments { get; set; }
    }
}
