using HMS.Data.Models;
using System.Collections.Generic;

namespace HMS.Data.Transfer
{
    public class HouseDTO
    {
        public int HouseId { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public IEnumerable<PersonDTO> Persons { get; set; }
        public decimal? MeterPayment { get; set; }
        public IEnumerable<Expense> Expenses { get; set; }
    }
}
