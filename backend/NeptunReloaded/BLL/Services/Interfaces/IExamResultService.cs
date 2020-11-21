using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Interfaces
{
    public interface IExamResultService
    {
        public Task <List<ExamResult>> ListExamResults(String filterNeptun = "");

        // Creates ExamResult with score -1 which indicates, that user is applied for that exam.
        public Task<ExamResult> createExamResult(User user, CreateExamResult exam);

        // Scores an ExamResult that was already created and has score -1
        public Task<ExamResult> scoreExam(User user, ExamResult examResult, int score);

    }
}
