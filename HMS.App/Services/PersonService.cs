using AutoMapper;
using HMS.Api.Repositories;
using HMS.Data.Models;
using HMS.Data.Transfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HMS.Api.Services
{
    public class PersonService : IPersonService
    {
        private readonly IHmsUnitOfWork _unit;
        private readonly IMapper _mapper;

        public PersonService(IHmsUnitOfWork unit, IMapper mapper)
        {
            _unit = unit;
            _mapper = mapper;
        }

        public void Add(Person entity)
        {
            _unit.PersonsRepository.Add(entity);
            _unit.Submit();
        }

        public void AddDTO(PersonDTO personDTO)
        {
            var contacts = _unit.ContactsRepository.Get();
            int maxContactID = contacts.Any() ? contacts.Max(x => x.ContactsId) : 0;
            var contact = _mapper.Map<Contact>(personDTO.Contacts);
            contact.ContactsId = maxContactID + 1;
            _unit.ContactsRepository.Add(contact);
            
            int maxPersonId = _unit.PersonsRepository.Get().Max(x => x.PersonId);
            var person = _mapper.Map<Person>(personDTO);
            person.PersonId = maxPersonId + 1;
            _unit.PersonsRepository.Add(person);

            var settler = new Settler 
            { 
                ContactId = contact.ContactsId,
                FlatArea = personDTO.FlatArea,
                FlatNumber = personDTO.FlatNumber,
                PersonId = person.PersonId
            };
            _unit.SettlersRepository.Add(settler);
            _unit.Submit();
        }

        public int Count()
        {
            return _unit.PersonsRepository.Get().Count();
        }

        public void Delete(int id)
        {
            var settler = _unit.SettlersRepository.Get(x => x.PersonId == id).FirstOrDefault();
            if(settler != null && settler.ContactId.HasValue)
            {
                _unit.ContactsRepository.Delete(settler.ContactId.Value);
            }
            _unit.SettlersRepository.Delete(id);
            _unit.PersonsRepository.Delete(id);
            _unit.Submit();
        }

        public IEnumerable<Person> Get()
        {
            return _unit.PersonsRepository.Get(includeProperties: "House").ToList();
        }

        public Person Get(int id)
        {
            return _unit.PersonsRepository.Get(includeProperties: "House")
                .First(x => x.PersonId == id);
        }

        public IEnumerable<Person> Get(Expression<Func<Person, bool>> filter = null, Func<IQueryable<Person>, IOrderedQueryable<Person>> orderBy = null, string includeProperties = "")
        {
            return _unit.PersonsRepository.Get(filter, orderBy, includeProperties);
        }

        public IEnumerable<PersonDTO> GetDTO()
        {
            var personDtos = Get().Select(x => _mapper.Map<PersonDTO>(x)).ToList();
            personDtos.ForEach(x =>
            {
                var settler = _unit.SettlersRepository.Get(filter: s => s.PersonId == x.PersonId).First();
                x.FlatNumber = settler.FlatNumber;
                x.FlatArea = settler.FlatArea;
                var contact = _unit.ContactsRepository.Get(filter: c => c.ContactsId == settler.ContactId)
                    .FirstOrDefault();
                x.Contacts = _mapper.Map<ContactsDTO>(contact);
            });
            return personDtos;
        }

        public PersonDTO GetDTO(int id)
        {
            var person = Get(filter: x => x.PersonId == id).FirstOrDefault();
            if (person == null)
                return null;

            var personDto = _mapper.Map<PersonDTO>(person);
            var settler = _unit.SettlersRepository.Get(filter: s => s.PersonId == person.PersonId)
                .First();
            personDto.FlatNumber = settler.FlatNumber;
            personDto.FlatArea = settler.FlatArea;
            var contact = _unit.ContactsRepository.Get(filter: c => c.ContactsId == settler.ContactId)
                .FirstOrDefault();
            personDto.Contacts = contact == null ? null : _mapper.Map<ContactsDTO>(contact);
            personDto.Payments = _unit.PaymentsRepository.Get(filter: x => x.PersonId == id, 
                    orderBy: x => x.OrderByDescending(x => x.Date));
            return personDto;
        }

        public void Save()
        {
            _unit.Submit();
        }

        public void Update(Person entity)
        {
            _unit.PersonsRepository.Update(entity);
            _unit.Submit();
        }

        public void UpdateDTO(PersonDTO personDTO)
        {
            var contact = _mapper.Map<Contact>(personDTO.Contacts);
            if (personDTO.Contacts.ContactsId == 0)
            {
                var contacts = _unit.ContactsRepository.Get();
                int maxContactID = contacts.Any() ? contacts.Max(x => x.ContactsId) : 0;
                contact.ContactsId = maxContactID + 1;
                _unit.ContactsRepository.Add(contact);
            }
            else
            {
                _unit.ContactsRepository.Update(contact);
            }

            var settler = new Settler
            {
                ContactId = contact.ContactsId,
                FlatArea = personDTO.FlatArea,
                FlatNumber = personDTO.FlatNumber,
                PersonId = personDTO.PersonId
            };
            _unit.SettlersRepository.Update(settler);

            var person = _mapper.Map<Person>(personDTO);
            _unit.PersonsRepository.Update(person);
            _unit.Submit();
        }
    }
}
