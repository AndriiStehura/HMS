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
    public class ExpensesController : ControllerBase
    {
        private IHmsUnitOfWork _unit;
        public ExpensesController(IHmsUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        public IEnumerable<Expense> Get()
        {
            return _unit.ExpensesRepository.Get();
        }

        [HttpGet("{id}")]
        public Expense Get(int id)
        {
            return _unit.ExpensesRepository.Get(id);
        }

        [HttpPost]
        public void Post([FromBody] Expense value)
        {
            _unit.ExpensesRepository.Add(value);
            _unit.Submit();
        }

        [HttpPut]
        public void Put([FromBody] Expense value)
        {
            _unit.ExpensesRepository.Update(value);
            _unit.Submit();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _unit.ExpensesRepository.Delete(id);
            _unit.Submit();
        }
    }
}
