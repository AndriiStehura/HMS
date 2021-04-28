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
            var services = _unit.ServicesRepository.Get();
            var expenses = _unit.ExpensesRepository.Get().ToList();
            expenses.ForEach(e => 
            {
                e.Service = services.FirstOrDefault();
            });

            return expenses;
        }

        [HttpGet("{id}")]
        public Expense Get(int id)
        {
            var expense = _unit.ExpensesRepository.Get(id);
            expense.Service = _unit.ServicesRepository.Get(filter: x => x.ServiceId == expense.ServiceId)
                .FirstOrDefault();
            return expense;
        }

        [HttpPost]
        public void Post([FromBody] Expense value)
        {
            var expenses = _unit.ExpensesRepository.Get();
            if(expenses.Any()){
                int maxId = expenses.Count();
                value.ExpenseId = maxId + 1;
            }
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
