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

        Task<Course> ICourseService.editCourse(User user ,CreateCourse course)
        {
            throw new NotImplementedException();
        }

        Task<Course> ICourseService.joinCourse(User user)
        {
            throw new NotImplementedException();
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
