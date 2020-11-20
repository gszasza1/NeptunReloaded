using AutoMapper;
using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class ExamService: IExamService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public ExamService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public Task<Exam> createExam(User user, CreateExam exam)
        {
            throw new NotImplementedException();
        }

        public Task<Exam> deleteExam(User user, Exam exam)
        {
            throw new NotImplementedException();
        }

        public Task<Exam> editExam(User user, Exam exam)
        {
            throw new NotImplementedException();
        }

        public Task<ExamResult> joinExam(User user, Exam exam)
        {
            throw new NotImplementedException();
        }

        public Task<ExamResult> leaveExam(User user, Exam exam)
        {
            throw new NotImplementedException();
        }

        public Task<List<Exam>> listExams(string filtername = "")
        {
            throw new NotImplementedException();
        }
    }
}
