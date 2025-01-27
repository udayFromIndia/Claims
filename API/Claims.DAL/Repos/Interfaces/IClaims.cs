using Claims.BL.DTO;
using Claims.BL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Claims.DAL.Repos.Interfaces
{
    public interface IClaims
    {
        Task<ServiceResponse> AddAsync(Claim claim);

        Task<ServiceResponse> UpdateAsync(Claim claim);
        Task<ServiceResponse> DeleteAsync(int id);
        Task<List<Claim>> GetAllAsync();
        Task<Claim> GetByIdAsync(int id);
        
    }
}
