using AutoMapper;
using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class SubjectService: ISubjectService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public SubjectService(NeptunReloadedDatabaseContext context)
        {
            _context = context;        
        }

        public async Task<Subject> createSubject(User user, CreateSubject subject)
        {
            Subject dbSubject = null;

            try {
                //Check if user is teacher
                if (!user.IsTeacher)
                    return await Task.FromResult(dbSubject); //return null if same 

                List<Subject> subjects = _context.Subjects.ToList().FindAll(s => s.Name == subject.Name);

                //Check if name is already in use
                if (subjects.Count > 0)
                    return await Task.FromResult(dbSubject); //return null if same task 

                dbSubject = subject.mapToDBSubject();

                _context.Subjects.Add(dbSubject);
                _context.SaveChanges();
            }
            catch (ArgumentNullException) { }


            return await Task.FromResult(dbSubject);
        }

        public async Task<List<Course>> listCourses(Subject subject)
        {
            List<Course> courses = new List<Course>();

            if (subject.Courses != null) {
                courses.AddRange(subject.Courses);
            }

            return await Task.FromResult(courses);
        }

        public async Task<List<Subject>> listSubjects(string filterName = "")
        {
            List<Subject> subjects = new List<Subject>();
            try
            {
                if (filterName.Length == 0)
                {
                    subjects.AddRange(_context.Subjects.ToList());
                }
                else {
                    subjects.AddRange(_context.Subjects.ToList().FindAll(s => s.Name.Contains(filterName)));
                }

            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(subjects);
        }
    }
}
