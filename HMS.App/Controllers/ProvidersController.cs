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
    public class ProvidersController : ControllerBase
    {
        private IProviderService _service;
        public ProvidersController(IProviderService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<ProviderDTO> Get()
        {
            return _service.GetDTO();
        }

        [HttpGet("{id}")]
        public ProviderDTO Get(int id)
        {
            return _service.GetDTO(id);
        }

        [HttpPost]
        public void Post([FromBody] ProviderDTO value)
        {
            _service.AddDTO(value);
        }

        [HttpPut]
        public void Put([FromBody] ProviderDTO value)
        {
            _service.UpdateDTO(value);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _service.Delete(id);
        }
    }
}
