using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Interfaces
{
    public interface IExamService
    {
        public Task<Exam> createExam(User user, CreateExam exam);
        public Task<List<Exam>> listExams(String filtername = "");
        public Task<Exam> editExam(User user, Exam exam);
        public Task<Exam> deleteExam(User user, Exam exam);
        public Task<ExamResult> joinExam(User user, Exam exam);
        public Task<ExamResult> leaveExam(User user, Exam exam);

    }
}
