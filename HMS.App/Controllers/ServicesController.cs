using HMS.Api.Repositories;
using HMS.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace HMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private IHmsUnitOfWork _unit;
        public ServicesController(IHmsUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        public IEnumerable<Service> Get()
        {
            return _unit.ServicesRepository.Get();
        }

        [HttpGet("{id}")]
        public Service Get(int id)
        {
            return _unit.ServicesRepository.Get(id);
        }

        [HttpPost]
        public void Post([FromBody] Service value)
        {
            var services = _unit.ServicesRepository.Get();
            if (services.Any())
            {
                int maxId = services.Max(x => x.ServiceId);
                value.ServiceId = maxId + 1;
            }
            else
            {
                value.ServiceId = 1;
            }
            _unit.ServicesRepository.Add(value);
            _unit.Submit();
        }

        [HttpPut]
        public void Put([FromBody] Service value)
        {
            _unit.ServicesRepository.Update(value);
            _unit.Submit();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _unit.ExpensesRepository.Get(filter: x => x.ServiceId == id).ToList()
                .ForEach(x => _unit.ExpensesRepository.Delete(x.ExpenseId));
            _unit.ServicesRepository.Delete(id);
            _unit.Submit();
        }
    }
}
