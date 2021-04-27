using AutoMapper;
using HMS.Api.Repositories;
using HMS.Api.Services;
using HMS.Data.Models;
using HMS.Data.Transfer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private IPersonService _personsService;
        private readonly IMapper _mapper;

        public PersonsController(IMapper mapper, IPersonService personService)
        {
            _mapper = mapper;
            _personsService = personService;
        }

        [HttpGet]
        public IEnumerable<PersonDTO> Get()
        {
            return _personsService.GetDTO();
        }

        [HttpGet("{id}")]
        public PersonDTO Get(int id)
        {
            return _personsService.GetDTO(id);
        }

        [HttpPost]
        public void Post([FromBody] PersonDTO value)
        {
            _personsService.AddDTO(value);
        }

        [HttpPut]
        public void Put([FromBody] PersonDTO value)
        {
            _personsService.UpdateDTO(value);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _personsService.Delete(id);
        }
    }
}
