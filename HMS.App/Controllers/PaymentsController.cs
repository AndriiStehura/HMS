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
    public class PaymentsController : ControllerBase
    {
        private IHmsUnitOfWork _unit;
        public PaymentsController(IHmsUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        public IEnumerable<Payment> Get()
        {
            return _unit.PaymentsRepository.Get();
        }

        [HttpGet("{id}")]
        public Payment Get(int id)
        {
            return _unit.PaymentsRepository.Get(id);
        }

        [HttpPost]
        public void Post([FromBody] Payment value)
        {
            var payments = _unit.PaymentsRepository.Get();
            if (payments.Any())
            {
                int maxId = payments.Max(x => x.PaymentId);
                value.PaymentId = maxId + 1;
            }
            else
            {
                value.PaymentId = 1;
            }
            _unit.PaymentsRepository.Add(value);
            _unit.Submit();
        }

        [HttpPut]
        public void Put([FromBody] Payment value)
        {
            _unit.PaymentsRepository.Update(value);
            _unit.Submit();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _unit.PaymentsRepository.Delete(id);
            _unit.Submit();
        }
    }
}
