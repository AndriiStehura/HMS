using AutoMapper;
using HMS.Api.Repositories;
using HMS.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using HMS.Data.Transfer;

namespace HMS.Api.Services
{
    public class HousesService : IHouseService
    {
        private readonly IHmsUnitOfWork _unit;
        private readonly IMapper _mapper;

        public HousesService(IHmsUnitOfWork unit, IMapper mapper)
        {
            _unit = unit;
            _mapper = mapper;
        }

        public void Add(House entity)
        {
            _unit.HousesRepository.Add(entity);
            _unit.Submit();
        }

        public int Count()
        {
            return _unit.HousesRepository.Get().Count();
        }

        public void Delete(int id)
        {
            _unit.HousesRepository.Delete(id);
            _unit.Submit();
        }

        public IEnumerable<House> Get()
        {
            var houses = _unit.HousesRepository.Get(includeProperties: "Address")
                .ToList();
            for(int i = 0; i < houses.Count(); ++i)
            {
                houses[i].Persons = _unit.PersonsRepository.Get(filter: x => x.HouseId == houses[i].HouseId)
                    .ToList();
            }
            return houses;
        }
        public IEnumerable<HouseDTO> GetDTO()
        {
            var houses = _unit.HousesRepository.Get(includeProperties: "Address")
                .Select(x => _mapper.Map<HouseDTO>(x))
                .ToList();
            for(int i = 0; i < houses.Count(); ++i)
            {
                houses[i].Persons = _unit.PersonsRepository.Get(filter: x => x.HouseId == houses[i].HouseId)
                    .Select(x => _mapper.Map<PersonDTO>(x))
                    .ToList();
            }
            return houses;
        }

        public House Get(int id)
        {
            return _unit.HousesRepository.Get(id);
        }

        public IEnumerable<House> Get(Expression<Func<House, bool>> filter = null, Func<IQueryable<House>, IOrderedQueryable<House>> orderBy = null, string includeProperties = "")
        {
            return _unit.HousesRepository.Get(filter, orderBy, includeProperties);
        }

        public void Save()
        {
            _unit.Submit();
        }

        public void Update(House entity)
        {
            _unit.HousesRepository.Update(entity);
            _unit.Submit();
        }

        public HouseDTO GetDTO(int id)
        {
            var house = _unit.HousesRepository.Get(id);
            if(house == null)
            {
                return null;
            }

            var mappedHouse = _mapper.Map<HouseDTO>(house);
            var persons = _unit.PersonsRepository
                .Get(filter: x => x.HouseId == mappedHouse.HouseId)
                .Select(x => _mapper.Map<PersonDTO>(x))
                .ToList();
            persons.ForEach(x =>
            {
                var settler = _unit.SettlersRepository.Get(filter: s => s.PersonId == x.PersonId).First();
                x.FlatNumber = settler.FlatNumber;
                x.FlatArea = settler.FlatArea;
                var contact = _unit.ContactsRepository.Get(filter: c => c.ContactsId == settler.ContactId)
                    .FirstOrDefault();
                x.Contacts = _mapper.Map<ContactsDTO>(contact);
            });

            mappedHouse.Persons = persons;
            return mappedHouse;
        }
    }
}
