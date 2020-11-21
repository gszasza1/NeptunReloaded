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
    public class ExamResultService : IExamResultService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public ExamResultService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task<ExamResult> createExamResult(User user, CreateExamResult examResult)
        {
            ExamResult dbExamResult = null;

            try
            {
                //Check if user is teacher
                if (!user.IsTeacher)
                    return await Task.FromResult(dbExamResult);

                //return null if user for exam is already applied
                List<ExamResult> examResults = getExamResults().FindAll(er => er.UserId == examResult.User.Id && er.ExamId == examResult.Exam.Id);

                //Check if name is already in use
                if (examResults.Count > 0)
                    return await Task.FromResult(dbExamResult); //return null if same task 

                dbExamResult = examResult.mapToDBExamResult();

                _context.ExamResults.Add(dbExamResult);
                _context.SaveChanges();
            }
            catch (ArgumentNullException) { }


            return await Task.FromResult(dbExamResult);
        }

        public async Task<List<ExamResult>> ListExamResults(string filterNeptun = "")
        {
            List<ExamResult> examResults = new List<ExamResult>();
            try
            {
                if (filterNeptun.Length == 0)
                {
                    examResults.AddRange(getExamResults());
                }
                else
                {
                    examResults.AddRange(getExamResults().FindAll(e => e.User.Neptun == filterNeptun));
                }

            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(examResults);
        }

        public async Task<ExamResult> scoreExam(User user, ExamResult examResult, int score)
        {
            ExamResult dbExamResult = null;

            if (!user.IsTeacher)
                await Task.FromResult(dbExamResult);

            try
            {
                dbExamResult = getExamResults().Find(er => er.Id == examResult.Id);

                if (dbExamResult != null)
                {

                    dbExamResult.Score = score;

                    _context.Update(dbExamResult);
                    _context.SaveChanges();
                }
            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(dbExamResult);
        }

        private List<ExamResult> getExamResults()
        {
            return _context.ExamResults.ToList().FindAll(er => er.IsDeleted == false);
        }
    }
}
