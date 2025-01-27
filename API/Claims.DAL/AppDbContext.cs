using Claims.BL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Claims.DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
                
        }
        public DbSet<Claim> Claims { get; set; }
    }
}
