using HMS.Api.Repositories;
using HMS.Data.Models;
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
    public class ContactsController : ControllerBase
    {
        private IHmsUnitOfWork _unit;
        public ContactsController(IHmsUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _unit.ContactsRepository.Get();
        }

        [HttpGet("{id}")]
        public Contact Get(int id)
        {
            return _unit.ContactsRepository.Get(id);
        }

        [HttpPost]
        public void Post([FromBody] Contact value)
        {
            _unit.ContactsRepository.Add(value);
            _unit.Submit();
        }

        [HttpPut]
        public void Put([FromBody] Contact value)
        {
            _unit.ContactsRepository.Update(value);
            _unit.Submit();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _unit.ContactsRepository.Delete(id);
            _unit.Submit();
        }
    }
}
