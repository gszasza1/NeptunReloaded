using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Models.Send;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Interfaces
{
    public interface ICourseResultService
    {
        public Task<IEnumerable<CourseResultExtended>> ListCourseResults();
        public Task<IEnumerable<CourseResultExtended>> ListUserCourseResults(int userId);

        public Task CreateCourseResult(CreateCourseResult result);

        public Task EditCourseResult(EditCourseResult examResult);

    }
}
