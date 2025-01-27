using Claims.BL.DTO;
using Claims.BL.Entities;
using Claims.DAL.Repos.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Claims.DAL.Repos.Services
{
    public class ClaimRepo : IClaims
    {
        private readonly AppDbContext _appDbContext;
        public ClaimRepo(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<ServiceResponse> AddAsync(Claim claim)
        {
            var check = await _appDbContext.Claims.FirstOrDefaultAsync(_=>_.PAN.ToLower() == claim.PAN.ToLower());
            if(check != null)
            {
                return new ServiceResponse(false, "User Already Exist");
            }
            _appDbContext.Claims.Add(claim);
            await _appDbContext.SaveChangesAsync();
            return new ServiceResponse(true, "Added");
        }

        public async Task<ServiceResponse> DeleteAsync(int id)
        {
            var claim = await _appDbContext.Claims.FindAsync(id);
            if (claim == null) return new ServiceResponse(false, "Claim not found");
            _appDbContext.Claims.Remove(claim);
            await _appDbContext.SaveChangesAsync();
            return new ServiceResponse(true, "Deleted");
        }

        public async Task<List<Claim>> GetAllAsync()=> await _appDbContext.Claims.AsNoTracking().ToListAsync();


        public async Task<Claim> GetByIdAsync(int id) => await _appDbContext.Claims.FindAsync(id);
        

        public async Task<ServiceResponse> UpdateAsync(Claim claim)
        {
            _appDbContext.Update(claim);
            await _appDbContext.SaveChangesAsync();
            return new ServiceResponse(true, "Updated");
        }
    }
}
