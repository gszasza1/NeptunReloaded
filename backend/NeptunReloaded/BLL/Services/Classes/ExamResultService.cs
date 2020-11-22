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
using Microsoft.EntityFrameworkCore;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class ExamResultService : IExamResultService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public ExamResultService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task createExamResult(CreateExamResult result)
        {
            if (result.ExamId == null || result.Score == null || result.UserId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var dbExamResult = new ExamResult()
            {
                UserId = result.UserId,
                Score=result.Score,
                ExamId=result.ExamId
            };

            _context.ExamResults.Add(dbExamResult);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task editExamResult(EditExamResult examResult)
        {
            if (examResult.NewScore == null || examResult.ExamResultId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var editExamResult = _context.ExamResults.FirstOrDefault(x => x.Id == examResult.ExamResultId);

            if (editExamResult == null)
            {
                throw new InvalidOperationException("Nem létező szoba");
            }
            editExamResult.Score = examResult.NewScore;

            _context.ExamResults.Update(editExamResult);
            await _context.SaveChangesAsync();

            return;
        }
        public async Task<IEnumerable<ExamResult>> ListExamResults()
        {
            return await _context.ExamResults.ToListAsync();
        }
    }

       
    
}
