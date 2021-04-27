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
    public class SettlersController : ControllerBase
    {
        private IHmsUnitOfWork _unit;
        public SettlersController(IHmsUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        public IEnumerable<Settler> Get()
        {
            return _unit.SettlersRepository.Get();
        }

        [HttpGet("{id}")]
        public Settler Get(int id)
        {
            return _unit.SettlersRepository.Get(id);
        }

        [HttpPost]
        public void Post([FromBody] Settler value)
        {
            _unit.SettlersRepository.Add(value);
            _unit.Submit();
        }

        [HttpPut]
        public void Put([FromBody] Settler value)
        {
            _unit.SettlersRepository.Update(value);
            _unit.Submit();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _unit.SettlersRepository.Delete(id);
            _unit.Submit();
        }
    }
}
