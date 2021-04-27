using AutoMapper;
using HMS.Api.Repositories;
using HMS.Data.Models;
using HMS.Data.Transfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace HMS.Api.Services
{
    public class ProviderService : IProviderService
    {
        IHmsUnitOfWork _unit;
        IMapper _mapper;

        public ProviderService(IHmsUnitOfWork unit, IMapper mapper)
        {
            _unit = unit;
            _mapper = mapper;
        }

        public void Add(Provider entity)
        {
            _unit.ProvidersRepository.Add(entity);
        }

        public void AddDTO(ProviderDTO providerDTO)
        {
            if(providerDTO.Contacts != null)
            {
                var contacts = _unit.ContactsRepository.Get();
                if(contacts.Any())
                {
                    int maxContactId = contacts.Max(x => x.ContactsId);
                    providerDTO.Contacts.ContactsId = maxContactId + 1;
                }
                else
                {
                    providerDTO.Contacts.ContactsId = 1;
                }
                _unit.ContactsRepository.Add(_mapper.Map<Contact>(providerDTO.Contacts));
            }

            var addresses = _unit.AddressesRepository.Get();
            if(addresses.Any())
            {
                providerDTO.Address.AddressId = addresses.Max(x => x.AddressId) + 1;
            }
            else
            {
                providerDTO.Address.AddressId = 1;
            }
            _unit.AddressesRepository.Add(providerDTO.Address);

            var provider = _mapper.Map<Provider>(providerDTO);
            var providers = _unit.ProvidersRepository.Get();
            if (providers.Any())
            {
                provider.ProviderId = providers.Max(x => x.ProviderId) + 1;
            }
            else
            {
                provider.ProviderId = 1;
            }
            provider.AddressId = providerDTO.Address.AddressId;
            provider.ContactId = providerDTO?.Contacts.ContactsId;
            _unit.ProvidersRepository.Add(provider);
            _unit.Submit();
        }

        public int Count()
        {
            return _unit.ProvidersRepository.Count();
        }

        public void Delete(int id)
        {
            _unit.ProvidersRepository.Delete(id);
            _unit.Submit();
        }

        public IEnumerable<Provider> Get()
        {
            return _unit.ProvidersRepository.Get();
        }

        public Provider Get(int id)
        {
            return _unit.ProvidersRepository.Get(id);
        }

        public IEnumerable<Provider> Get(Expression<Func<Provider, bool>> filter = null, Func<IQueryable<Provider>, IOrderedQueryable<Provider>> orderBy = null, string includeProperties = "")
        {
            return _unit.ProvidersRepository.Get(filter, orderBy, includeProperties);
        }

        public IEnumerable<ProviderDTO> GetDTO()
        {
            var providers = _unit.ProvidersRepository.Get();
            var providerDtos = new List<ProviderDTO>();
            foreach (var provider in providers)
            {
                var dto = _mapper.Map<ProviderDTO>(provider);
                dto.Address = _unit.AddressesRepository
                    .Get(filter: x => x.AddressId == provider.AddressId)
                    .First();
                dto.Contacts = _mapper.Map<ContactsDTO>(_unit.ContactsRepository
                    .Get(filter: x => x.ContactsId == provider.ContactId)
                    .FirstOrDefault());
                dto.Services = _unit.ServicesRepository.Get(filter: x => x.ProviderId == provider.ProviderId);
                providerDtos.Add(dto);
            }
            return providerDtos;
        }

        public ProviderDTO GetDTO(int id)
        {
            var provider = _unit.ProvidersRepository.Get(id);

            var dto = _mapper.Map<ProviderDTO>(provider);
            dto.Address = _unit.AddressesRepository
                .Get(filter: x => x.AddressId == provider.AddressId)
                .First();
            dto.Contacts = _mapper.Map<ContactsDTO>(_unit.ContactsRepository
                .Get(filter: x => x.ContactsId == provider.ContactId)
                .FirstOrDefault());
            dto.Services = _unit.ServicesRepository.Get(filter: x => x.ProviderId == provider.ProviderId);
            return dto;
        }

        public void Save()
        {
            _unit.ProvidersRepository.Save();
        }

        public void Update(Provider entity)
        {
            _unit.ProvidersRepository.Update(entity);
        }

        public void UpdateDTO(ProviderDTO providerDTO)
        {
            if(providerDTO.Contacts != null)
            {
                if (providerDTO.Contacts.ContactsId > 0)
                    _unit.ContactsRepository.Update(_mapper.Map<Contact>(providerDTO.Contacts));
                else
                {
                    var contacts = _unit.ContactsRepository.Get();
                    if (contacts.Any())
                    {
                        int maxContactId = contacts.Max(x => x.ContactsId);
                        providerDTO.Contacts.ContactsId = maxContactId + 1;
                    }
                    else
                    {
                        providerDTO.Contacts.ContactsId = 1;
                    }
                    _unit.ContactsRepository.Add(_mapper.Map<Contact>(providerDTO.Contacts));
                }
            }
            _unit.AddressesRepository.Update(providerDTO.Address);
            var provider = _mapper.Map<Provider>(providerDTO);
            provider.AddressId = providerDTO.Address.AddressId;
            provider.ContactId = providerDTO?.Contacts.ContactsId;
            provider.Services = null;
            _unit.ProvidersRepository.Update(provider);
            _unit.Submit();
        }
    }
}
