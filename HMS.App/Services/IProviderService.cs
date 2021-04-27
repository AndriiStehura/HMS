using HMS.Api.Repositories;
using HMS.Data.Models;
using HMS.Data.Transfer;

namespace HMS.Api.Services
{
    public interface IProviderService: IService<ProviderDTO>, IRepository<Provider>
    {
        public void AddDTO(ProviderDTO providerDTO);
        public void UpdateDTO(ProviderDTO providerDTO);
    }
}
