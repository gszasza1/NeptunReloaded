using AutoMapper;
using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using NeprunReloaded.DAL.Additional;
using NeptunReloaded.BLL.Models.Send;
using Microsoft.EntityFrameworkCore;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class CourseService : ICourseService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public CourseService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task createCourse(int userId, CreateCourse course)
        {
            if (course.Name == null || course.SubjectId == null || course.RoomId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var dbCourse = new Course()
            {
                Name = course.Name,
                SubjectId = course.SubjectId,
                RoomId = course.RoomId,
                UserId=userId
            };

            _context.Courses.Add(dbCourse);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task editCourse(EditCourse course)
        {
            if (course.newName == null || course.Id == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var editCourse = _context.Courses.FirstOrDefault(x => x.Id == course.Id);

            if (editCourse == null)
            {
                throw new InvalidOperationException("Nem létező szoba");
            }
            editCourse.Name = course.newName;

            _context.Courses.Update(editCourse);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task joinCourse(int userId, JoinCourse course)
        {
            if (course.CourseId == null || userId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var alreadyExist = await _context.UserCourses.FirstOrDefaultAsync(x => x.UserId == userId && x.CourseId == course.CourseId);

            if (alreadyExist != null)
            {
                throw new InvalidOperationException("Már jelentkezett a kurzusra");
            }
            var dbUserCourse = new UserCourse()
            {
                CourseId = course.CourseId,
                UserId = userId
            };

           await _context.UserCourses.AddAsync(dbUserCourse);
           await _context.SaveChangesAsync();

            return;
        }

        public async Task<IEnumerable<Course>> listCourses()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<IEnumerable<CoursesPopUp>> listCoursesBySubject(int userId, int subjectId)
        {
            var asd =  _context.Courses.Where(x => x.SubjectId == subjectId)
                 .Include(z => z.UserCourses).ThenInclude(u => u.User)
                 .Include(t => t.User)
                 .Include(x => x.Room)
                 .Include(y => y.Subject);
                
            var sajt= await asd.Select(q => new CoursesPopUp()
            {
                Id = q.Id,
                Name=q.Name,
                Subject = q.Subject,
                Room = q.Room,
                Member = q.UserCourses.Any(l => l.UserId == userId),
                User = new UserSelect() { Id = q.User.Id, Name = q.User.FirstName + " " + q.User.LastName }
            }).ToListAsync();

            return sajt;
        }

        public async Task<IEnumerable<CourseSelect>> listCoursesSelect()
        {
            return await _context.Courses.Where(c => !c.IsDeleted).Select(y => new CourseSelect() { Id = y.Id, Name = y.Name }).ToListAsync();
        }

        public async Task<IEnumerable<CourseSelect>> listTeacherAllCourses(int userId)
        {
            return await _context.Courses.Where(c => !c.IsDeleted && c.UserId==userId).Select(y => new CourseSelect() { Id = y.Id, Name = y.Name }).ToListAsync();
        }
    }
}
