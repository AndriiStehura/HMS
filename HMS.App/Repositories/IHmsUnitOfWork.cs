using HMS.Data.Models;

namespace HMS.Api.Repositories
{
    public interface IHmsUnitOfWork
    {
        public IRepository<Address> AddressesRepository { get; }
        public IRepository<Contact> ContactsRepository { get; }
        public IRepository<Provider> ProvidersRepository { get; }
        public IRepository<Service> ServicesRepository { get; }
        public IRepository<House> HousesRepository { get; }
        public IRepository<Person> PersonsRepository { get; }
        public IRepository<Manager> ManagersRepository { get; }
        public IRepository<Settler> SettlersRepository { get; }
        public IRepository<Expense> ExpensesRepository { get; }
        public IRepository<Payment> PaymentsRepository { get; }

        public void Submit();
    }
}
