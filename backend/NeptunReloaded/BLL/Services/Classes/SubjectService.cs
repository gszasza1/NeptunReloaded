using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NeprunReloaded.DAL.Additional;
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

        public async Task createSubject( CreateSubject subject)
        {
            if (subject.Name == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var dbSubject = new Subject()
            {
                Name = subject.Name
            };

            _context.Subjects.Add(dbSubject);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task editSubject(EditSubject subject)
        {
            if (subject.newName == null || subject.Id==null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var editSubject = _context.Subjects.FirstOrDefault(x => x.Id == subject.Id);

            if (editSubject == null)
            {
                throw new InvalidOperationException("Nem létező szoba");
            }
            editSubject.Name = subject.newName;

            _context.Subjects.Update(editSubject);
            await _context.SaveChangesAsync();

            return;
        }
        public async Task<IEnumerable<Subject>> listSubjects()
        {
            return await _context.Subjects.ToListAsync();
        }

        public async Task<IEnumerable<SubjectSelect>> listSubjectSelect()
        {
            return await _context.Subjects.Where(c=>!c.IsDeleted).Select(y=> new SubjectSelect() { Id=y.Id,Name=y.Name}).ToListAsync();
        }
    }
}
