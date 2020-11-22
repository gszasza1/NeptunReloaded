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
        public Task <IEnumerable<ExamResult>> ListExamResults();

        public Task createExamResult(CreateExamResult result);

        public Task editExamResult(ExamResult examResult);

    }
}
