using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Interfaces
{
    public interface ICourseService
    {
        public Task< List<Course> > listCourses(String filterName = "");

        public Task<Course> createCourse(User user, CreateCourse course);

        public Task<Course> editCourse(User user, Course course);

        public Task<UserCourse> joinCourse(User user, Course course);

        public Task<List<Course>> listCoursesForUser(User user);
    }
}
