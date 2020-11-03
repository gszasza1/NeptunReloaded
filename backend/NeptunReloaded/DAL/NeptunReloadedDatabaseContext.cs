using Microsoft.EntityFrameworkCore;
using NeptunReloaded.DAL;
using NeptunReloaded.DAL.Entities;
using System;

namespace NeptunReloaded.DAL
{
    public class NeptunReloadedDatabaseContext:DbContext
    {
        public DbSet<User> Users { get; }
        public NeptunReloadedDatabaseContext(DbContextOptions<NeptunReloadedDatabaseContext> options)
           : base(options)
        {
            Users = Set<User>();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // User


            // Combat report
            builder.Entity<User>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();



            base.OnModelCreating(builder);
        }
    }
}
