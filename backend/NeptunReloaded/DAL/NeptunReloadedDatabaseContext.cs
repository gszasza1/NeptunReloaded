using Microsoft.EntityFrameworkCore;
using NeprunReloaded.DAL.Entities;
using NeptunReloaded.DAL.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace NeptunReloaded.DAL
{
    public class NeptunReloadedDatabaseContext:DbContext
    {
        public DbSet<User> Users { get; }
        public DbSet<Course> Courses { get; }
        public DbSet<UserCourse> UserCourses { get; }
        public DbSet<Subject> Subjects { get; }
        public DbSet<Room> Rooms { get; }
        public DbSet<Exam> Exams { get; }
        public DbSet<CourseResult> CourseResults { get; }
        public DbSet<UserExam> UserExams { get; }

        public NeptunReloadedDatabaseContext(DbContextOptions<NeptunReloadedDatabaseContext> options)
           : base(options)
        {
            Users = Set<User>();
            Courses = Set<Course>();
            UserCourses = Set<UserCourse>();
            Subjects = Set<Subject>();
            Rooms = Set<Room>();
            Exams = Set<Exam>();
            CourseResults = Set<CourseResult>();
            UserExams = Set<UserExam>();
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
                        entry.CurrentValues["IsDeleted"] = false;
                        break;
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["IsDeleted"] = true;
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

            builder.Entity<Course>()
            .HasOne(s => s.Subject)
            .WithMany(g => g.Courses)
            .HasForeignKey(s => s.SubjectId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Course>()
            .HasOne(s => s.Room)
            .WithMany(g => g.Courses)
            .HasForeignKey(s => s.RoomId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.NoAction);


            #endregion

            #region UserCourse
            builder.Entity<UserCourse>()
                  .HasKey(bc => new { bc.UserId, bc.CourseId });

            builder.Entity<UserCourse>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.UserCourses)
                .HasForeignKey(bc => bc.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<UserCourse>()
                .HasOne(bc => bc.Course)
                .WithMany(c => c.UserCourses)
                .HasForeignKey(bc => bc.CourseId)
                .OnDelete(DeleteBehavior.NoAction);
            #endregion

            #region UserExam
            builder.Entity<UserExam>()
                   .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            builder.Entity<UserExam>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.UserExams)
                .HasForeignKey(bc => bc.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<UserExam>()
                .HasOne(bc => bc.Exam)
                .WithMany(c => c.UserExams)
                .HasForeignKey(bc => bc.ExamId)
                .OnDelete(DeleteBehavior.NoAction);
            #endregion

            #region Room

            builder.Entity<Room>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();
            #endregion

            #region Subject

            builder.Entity<Subject>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();
            #endregion

            #region Exam

            builder.Entity<Exam>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            builder.Entity<Exam>()
            .HasOne(p => p.Course)
            .WithMany(b => b.Exams)
            .HasForeignKey(p => p.CourseId)
            .OnDelete(DeleteBehavior.NoAction);

            #endregion

            #region CourseResult

            builder.Entity<CourseResult>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            builder.Entity<CourseResult>()
            .HasOne(p => p.Course)
            .WithMany(b => b.CourseResults)
            .HasForeignKey(p => p.CourseId)
            .OnDelete(DeleteBehavior.NoAction);
            
            builder.Entity<CourseResult>()
            .HasOne(p => p.User)
            .WithMany(b => b.CourseResults)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.NoAction);
            #endregion


            base.OnModelCreating(builder);
        }
    }
}
