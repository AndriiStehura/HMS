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
    public class ManagersController : ControllerBase
    {
        private IHmsUnitOfWork _unit;
        public ManagersController(IHmsUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        public IEnumerable<Manager> Get()
        {
            return _unit.ManagersRepository.Get();
        }

        [HttpGet("{id}")]
        public Manager Get(int id)
        {
            return _unit.ManagersRepository.Get(id);
        }

        [HttpPost]
        public void Post([FromBody] Manager value)
        {
            _unit.ManagersRepository.Add(value);
            _unit.Submit();
        }

        [HttpPut]
        public void Put([FromBody] Manager value)
        {
            _unit.ManagersRepository.Update(value);
            _unit.Submit();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _unit.ManagersRepository.Delete(id);
            _unit.Submit();
        }
    }
}
