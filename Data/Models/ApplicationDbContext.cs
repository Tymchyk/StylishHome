using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Store.Data
{
 public class  ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {            
    }
    public DbSet<Items> Items{get;set;}
    public DbSet<SceneValue> SceneValues { get; set; }
    public DbSet<Order> Order{get;set;}

}
}