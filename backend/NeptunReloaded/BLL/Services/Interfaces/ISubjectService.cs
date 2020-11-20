using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Interfaces
{
    public interface ISubjectService
    {
        //if name is empty lists all subjects
        public Task<List<Subject>> listSubjects(String filterName = "");

        public Task<Subject> createSubject(User user, CreateSubject subject );

        public Task<List<Course>> listCourses(Subject subject);

    }
}
