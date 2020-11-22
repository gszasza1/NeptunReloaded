using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Interfaces
{
    public interface ISubjectService
    {
        public Task<IEnumerable<Subject>> listSubjects();
        public Task createSubject(CreateSubject subject);
        public Task editSubject(EditSubject subject);
        public Task<IEnumerable<SubjectSelect>> listSubjectSelect();

    }
}
