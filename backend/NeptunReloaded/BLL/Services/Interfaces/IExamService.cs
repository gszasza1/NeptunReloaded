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
    public interface IExamService
    {
        public Task createExam(CreateExam exam);
        public Task<IEnumerable<Exam>> listExams(int userId);
        public Task<IEnumerable<ExamSelect>> listExamsSelect(int userId);
        public Task editExam(EditExam exam);
        public Task deleteExam(DeleteExam exam);
        public Task joinExam(int userId, JoinExam exam);
        public Task leaveExam(int userId, LeaveExam exam);

    }
}
