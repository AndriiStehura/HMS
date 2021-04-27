using HMS.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Api.Repositories
{
    public class HouseRepository : Repository<House>
    {
        public HouseRepository(DbContext context) : base(context)
        {
        }

        public override void Add(House entity)
        {
            entity.Address.AddressId = _context.Set<Address>().Max(x => x.AddressId) + 1;
            entity.AddressId = entity.Address.AddressId;
            entity.HouseId = _dbSet.Max(x => x.HouseId) + 1;
            base.Add(entity);
        }

        public override void Update(House entityToUpdate)
        {
            _context.Set<Address>().Update(entityToUpdate.Address);
            base.Update(entityToUpdate);
        }

        public override void Delete(int id)
        {
            base.Delete(id);
        }
    }
}
