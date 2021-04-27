using AutoMapper;
using HMS.Api.Services;
using HMS.Data.Models;
using HMS.Data.Transfer;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace HMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HousesController : ControllerBase
    {
        private readonly IHouseService _service;
        private readonly IMapper _mapper;
        public HousesController(IHouseService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<HouseDTO> Get()
        {
            return _service.GetDTO();
        }

        [HttpGet("{id}")]
        public HouseDTO Get(int id)
        {
            return _service.GetDTO(id);
        }

        [HttpPost]
        public void Post([FromBody] HouseDTO value)
        {
            _service.Add(_mapper.Map<House>(value));
        }

        [HttpPut]
        public void Put([FromBody] House value)
        {
            _service.Update(value);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _service.Delete(id);
        }
    }
}
