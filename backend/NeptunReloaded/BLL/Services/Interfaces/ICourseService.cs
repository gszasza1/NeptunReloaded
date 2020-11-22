using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Models.Send;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Interfaces
{
    public interface ICourseService
    {
        public Task<IEnumerable<Course>> listCourses();

        public Task createCourse(int userId, CreateCourse course);

        public Task editCourse(EditCourse course);

        public Task joinCourse(int userId, JoinCourse course);

        public Task<IEnumerable<CoursesPopUp>> listCoursesBySubject(int userId,CoursesBySubject subject);
        public Task<IEnumerable<CourseSelect>> listCoursesSelect(int userId);
    }
}
