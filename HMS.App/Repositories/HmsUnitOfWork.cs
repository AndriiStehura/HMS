using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HMS.Data.Context;
using HMS.Data.Models;

namespace HMS.Api.Repositories
{
    public class HmsUnitOfWork: IHmsUnitOfWork
    {
        private HouseManagementContext _context;
        private IRepository<Address> _addressRepo;
        private IRepository<Contact> _contactsRepo;
        private IRepository<Provider> _providersRepo;
        private IRepository<Service> _servicesRepo;
        private IRepository<House> _housesRepo;
        private IRepository<Person> _personsRepo;
        private IRepository<Manager> _managersRepo;
        private IRepository<Settler> _settlersRepo;
        private IRepository<Expense> _expensesRepo;
        private IRepository<Payment> _paymentsRepo;

        public HmsUnitOfWork(HouseManagementContext context)
        {
            _context = context;
        }

        public IRepository<Address> AddressesRepository
        {
            get
            {
                _addressRepo ??= new Repository<Address>(_context);
                return _addressRepo;
            }
        }
        public IRepository<Contact> ContactsRepository
        {
            get
            {
                _contactsRepo ??= new Repository<Contact>(_context);
                return _contactsRepo;
            }
        }

        public IRepository<Provider> ProvidersRepository
        {
            get
            {
                _providersRepo ??= new Repository<Provider>(_context);
                return _providersRepo;
            }
        }

        public IRepository<Service> ServicesRepository
        {
            get
            {
                _servicesRepo ??= new Repository<Service>(_context);
                return _servicesRepo;
            }
        }

        public IRepository<House> HousesRepository
        {
            get
            {
                _housesRepo ??= new HouseRepository(_context);
                return _housesRepo;
            }
        }

        public IRepository<Person> PersonsRepository
        {
            get
            {
                _personsRepo ??= new Repository<Person>(_context);
                return _personsRepo;
            }
        }

        public IRepository<Manager> ManagersRepository
        {
            get
            {
                _managersRepo ??= new Repository<Manager>(_context);
                return _managersRepo;
            }
        }

        public IRepository<Settler> SettlersRepository
        {
            get
            {
                _settlersRepo ??= new Repository<Settler>(_context);
                return _settlersRepo;
            }
        }

        public IRepository<Expense> ExpensesRepository
        {
            get
            {
                _expensesRepo ??= new Repository<Expense>(_context);
                return _expensesRepo;
            }
        }

        public IRepository<Payment> PaymentsRepository
        {
            get
            {
                _paymentsRepo ??= new Repository<Payment>(_context);
                return _paymentsRepo;
            }
        }

        public void Submit()
        {
            _context.SaveChanges();
        }
    }
}
