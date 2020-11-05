using Microsoft.EntityFrameworkCore;
using NeprunReloaded.DAL.Entities;
using NeptunReloaded.DAL;
using NeptunReloaded.DAL.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace NeptunReloaded.DAL
{
    public class NeptunReloadedDatabaseContext:DbContext
    {
        public DbSet<User> Users { get; }
        public DbSet<Course> Courses { get; }
        public DbSet<UserCourse> UserCourses { get; }
        public NeptunReloadedDatabaseContext(DbContextOptions<NeptunReloadedDatabaseContext> options)
           : base(options)
        {
            Users = Set<User>();
            Courses = Set<Course>();
            UserCourses = Set<UserCourse>();
        }
        public override int SaveChanges()
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateSoftDeleteStatuses()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["isDeleted"] = false;
                        break;
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["isDeleted"] = true;
                        break;
                }
            }
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {


            #region User

            builder.Entity<User>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            #endregion

            #region Course

            builder.Entity<Course>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            builder.Entity<Course>()
            .HasOne(s => s.User)
            .WithMany(g => g.Courses)
            .HasForeignKey(s => s.UserId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.NoAction);


            #endregion

            #region UserCourse



            builder.Entity<UserCourse>()
           .HasKey(bc => new { bc.CourseId, bc.UserId });


            #endregion
            builder.Entity<User>()
            .HasMany(m => m.UserCourses)
            .WithOne(m => m.User)
            .HasForeignKey(k => k.UserId)
            .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Course>()
            .HasMany(m => m.UserCourses)
            .WithOne(m => m.Course)
            .HasForeignKey(k => k.CourseId)
            .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<UserCourse>()
            .HasOne(m => m.User)
            .WithMany(m => m.UserCourses)
            .HasForeignKey(k => k.UserId)
            .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<UserCourse>()
            .HasOne(m => m.Course)
            .WithMany(m => m.UserCourses)
            .HasForeignKey(k => k.CourseId)
            .OnDelete(DeleteBehavior.NoAction);


            base.OnModelCreating(builder);
        }
    }
}
