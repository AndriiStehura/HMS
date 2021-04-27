using HMS.Api.Repositories;
using HMS.Data.Models;
using HMS.Data.Transfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Api.Services
{
    public interface IPersonService: IService<PersonDTO>, IRepository<Person>
    {
        public void AddDTO(PersonDTO personDTO);
        public void UpdateDTO(PersonDTO personDTO);
    }
}
