using System.Collections.Generic;

namespace HMS.Api.Services
{
    public interface IService<TEntity>
    {
        IEnumerable<TEntity> GetDTO();
        TEntity GetDTO(int id);
    }
}
