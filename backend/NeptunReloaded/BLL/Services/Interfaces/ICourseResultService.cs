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
    public interface ICourseResultService
    {
        public Task <IEnumerable<CourseResultExtended>> ListCourseResults();

        public Task CreateCourseResult(CreateCourseResult result);

        public Task EditCourseResult(EditCourseResult examResult);

    }
}
