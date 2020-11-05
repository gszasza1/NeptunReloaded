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
        //public DbSet<Exam> Exams { get; }
        //public DbSet<ExamResult> ExamResults { get; }
        //public DbSet<Room> Rooms { get; }
        //public DbSet<Subject> Subjects { get; }
        public NeptunReloadedDatabaseContext(DbContextOptions<NeptunReloadedDatabaseContext> options)
           : base(options)
        {
            Users = Set<User>();
            Courses = Set<Course>();
           UserCourses = Set<UserCourse>();
            //Exams = Set<Exam>();
            //ExamResults = Set<ExamResult>();
            //Rooms = Set<Room>();
            //Subjects = Set<Subject>();
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
           .HasKey(f => f.Id);

            builder.Entity<User>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            #endregion

            #region Course

            builder.Entity<Course>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            builder.Entity<Course>()
             .HasKey(f => f.Id);

            #endregion

            //#region Exam

            //builder.Entity<Exam>()
            //.Property(f => f.Id)
            //.ValueGeneratedOnAdd();
            
            //#endregion

            //#region ExamResult

            //builder.Entity<ExamResult>()
            //.Property(f => f.Id)
            //.ValueGeneratedOnAdd();

            //#endregion

            //#region Room

            //builder.Entity<Room>()
            //.Property(f => f.Id)
            //.ValueGeneratedOnAdd();

            //#endregion

            //#region Subject

            //builder.Entity<Subject>()
            //.Property(f => f.Id)
            //.ValueGeneratedOnAdd();

            //#endregion

            #region UserCourse


            builder.Entity<UserCourse>()
            .HasKey(bc => new { bc.CourseId, bc.UserId });

            builder.Entity<UserCourse>()
            .HasOne(bc => bc.Course)
            .WithMany(b => b.UserCourses)
            .HasForeignKey(bc => bc.CourseId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<UserCourse>()
            .HasOne(bc => bc.User)
            .WithMany(b => b.UserCourses)
            .HasForeignKey(bc => bc.UserId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.NoAction);
            #endregion
            


            base.OnModelCreating(builder);
        }
    }
}
