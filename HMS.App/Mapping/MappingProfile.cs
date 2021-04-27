using AutoMapper;
using HMS.Data.Models;
using HMS.Data.Transfer;

namespace HMS.App.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Person, PersonDTO>().ReverseMap();
            CreateMap<House, HouseDTO>().ReverseMap();
            CreateMap<Contact, ContactsDTO>().ReverseMap();
            CreateMap<Provider, ProviderDTO>().ReverseMap();
        }
    }
}
