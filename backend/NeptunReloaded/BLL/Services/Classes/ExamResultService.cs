using AutoMapper;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class ExamResultService : IExamResultService
    {
        private readonly NeptunReloadedDatabaseContext _context;
        private readonly IMapper _mapper;

        public ExamResultService(NeptunReloadedDatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
