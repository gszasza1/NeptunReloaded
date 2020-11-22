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
    public class ExamService: IExamService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public ExamService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task createExam(CreateExam exam)
        {
            if (exam.Name == null || exam.CourseId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var dbExam = new Exam()
            {
                Name = exam.Name,
                CourseId=exam.CourseId
            };

            _context.Exams.Add(dbExam);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task deleteExam(DeleteExam exam)
        {
            if ( exam.ExamId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var deleteExam = _context.Exams.FirstOrDefault(x => x.Id == exam.ExamId);

            _context.Exams.Remove(deleteExam);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task editExam(EditExam exam)
        {
            if (exam.newName == null || exam.Id == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var editExam= _context.Exams.FirstOrDefault(x => x.Id == exam.Id);

            if (editExam == null)
            {
                throw new InvalidOperationException("Nem létező szoba");
            }
            editExam.Name = exam.newName;

            _context.Exams.Update(editExam);
            await _context.SaveChangesAsync();

            return;

        }

        public Task joinExam(int userId, JoinExam exam)
        {
            //TODO
            throw new NotImplementedException();
        }

        public Task leaveExam(int userId, LeaveExam exam)
        {
            //TODO
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Exam>> listExams(int userId)
        {
            return await _context.Exams.ToListAsync();
        }

        public async Task<IEnumerable<ExamSelect>> listExamsSelect(int userId)
        {
            return await _context.Exams.Where(c => !c.IsDeleted).Select(y => new ExamSelect() { Id = y.Id, Name = y.Name }).ToListAsync();
        }
    }
}
