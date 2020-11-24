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
using NeptunReloaded.BLL.Models.Send;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class CourseResultService : ICourseResultService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public CourseResultService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task CreateCourseResult(CreateCourseResult result)
        {
            if (result.ExamId == null || result.Score == null || result.UserId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var dbExamResult = new CourseResult()
            {
                UserId = result.UserId,
                Score = result.Score,
                CourseId = result.ExamId
            };

            _context.CourseResults.Add(dbExamResult);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task EditCourseResult(EditCourseResult examResult)
        {
            if (examResult.NewScore == null || examResult.CourseResultId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var editExamResult = _context.CourseResults.FirstOrDefault(x => x.Id == examResult.CourseResultId);

            if (editExamResult == null)
            {
                throw new InvalidOperationException("Nem létező szoba");
            }
            editExamResult.Score = examResult.NewScore;

            _context.CourseResults.Update(editExamResult);
            await _context.SaveChangesAsync();

            return;
        }
        public async Task<IEnumerable<CourseResultExtended>> ListCourseResults()
        {
            return await _context.CourseResults.Include(x => x.Course).Include(y => y.User).Select(z => new CourseResultExtended()
            {
                CourseName = z.Course.Name,
                Id = z.Id,
                Neptun = z.User.Neptun,
                Score = z.Score
            }).ToListAsync();
        }
    }

}