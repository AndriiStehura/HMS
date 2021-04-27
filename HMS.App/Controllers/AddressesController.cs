using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HMS.Data.Models;
using HMS.Api.Repositories;
using HMS.Data.Context;

namespace HMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private IHmsUnitOfWork _unit;
        public AddressesController(IHmsUnitOfWork unit)
        {
            _unit = unit;
        }

        // GET: api/<AdressesController>
        [HttpGet]
        public IEnumerable<Address> Get()
        {
            return _unit.AddressesRepository.Get();
        }

        // GET api/<AdressesController>/5
        [HttpGet("{id}")]
        public Address Get(int id)
        {
            return _unit.AddressesRepository.Get(id);
        }

        // POST api/<AdressesController>
        [HttpPost]
        public void Post([FromBody] Address value)
        {
            value.AddressId = _unit.AddressesRepository.Count() + 1;
            _unit.AddressesRepository.Add(value);
            _unit.Submit();
        }

        // PUT api/<AdressesController>/5
        [HttpPut]
        public void Put([FromBody] Address value)
        {
            _unit.AddressesRepository.Update(value);
            _unit.Submit();
        }

        // DELETE api/<AdressesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _unit.AddressesRepository.Delete(id);
            _unit.Submit();
        }
    }
}
