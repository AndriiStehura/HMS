using HMS.Api.Repositories;
using HMS.Data.Models;
using HMS.Data.Transfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Api.Services
{
    public interface IHouseService: IService<HouseDTO>, IRepository<House>
    {
    }
}
