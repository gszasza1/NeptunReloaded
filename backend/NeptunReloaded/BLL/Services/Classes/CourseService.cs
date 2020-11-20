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

namespace NeptunReloaded.BLL.Services.Classes
{
    public class CourseService : ICourseService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public CourseService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Course>> listCoursesForUser(User user)
        {
            List<Course> courses = new List<Course>();
            try
            {
                 _context.UserCourses.ToList().FindAll(uc => uc.UserId == user.Id).ForEach(
                     a =>
                     {
                         Course foundCourse = _context.Courses.ToList().Find(course => course.Id == a.CourseId);
                         if (foundCourse != null)
                             courses.Add(foundCourse);
                     });
            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(courses);
        }

        async Task<Course> ICourseService.createCourse(User user ,CreateCourse course)
        {
            Course dbCourse = null;

            try
            {
                //Check if user is teacher
                if (!user.IsTeacher)
                    return await Task.FromResult(dbCourse); //return null if same 

                List<Course> courses = _context.Courses.ToList().FindAll(s => s.Name == course.Name);

                //Check if name is already in use
                if (courses.Count > 0)
                    
                    return await Task.FromResult(dbCourse); //return null if same task 

                dbCourse = course.mapToDBCourse();

                _context.Courses.Add(dbCourse);
                _context.SaveChanges();
            }
            catch (ArgumentNullException) { }


            return await Task.FromResult(dbCourse);
        }

        async Task<Course> ICourseService.editCourse(User user ,Course course)
        {
            Course dbCourse = null;
            
            if(!user.IsTeacher)
                await Task.FromResult(dbCourse);

            try
            {
                dbCourse = (Course)_context.Courses.ToList().Find(c => c.Id == course.Id);

                if (dbCourse != null)
                {
                   
                    dbCourse.Name = course.Name;
                    
                    dbCourse.RoomId = course.RoomId;

                    _context.Update(dbCourse);
                    _context.SaveChanges();
                }
            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(dbCourse);
        }

        async Task<UserCourse> ICourseService.joinCourse(User user, Course course)
        {
            UserCourse userCourse = null;

            try
            {

                UserCourse match = _context.UserCourses.ToList().Find(uc => uc.CourseId == course.Id && uc.UserId == user.Id);

                if(match == null) {

                    userCourse = new UserCourse { Course = course, CourseId = course.Id, User = user, UserId = user.Id };

                    _context.UserCourses.Add(userCourse);
                    _context.SaveChanges();
                }

            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(userCourse);
        }

        async Task<List<Course>>  ICourseService.listCourses(string filterName)
        {
            List<Course> courses = new List<Course>();
            try
            {
                if (filterName.Length == 0)
                {
                    courses.AddRange(_context.Courses.ToList());
                }
                else
                {
                    courses.AddRange(_context.Courses.ToList().FindAll(s => s.Name.Contains(filterName)));
                }

            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(courses);
        }
    }
}
