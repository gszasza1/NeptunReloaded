﻿using AutoMapper;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class CourseService : ICourseService
    {
        private readonly NeptunReloadedDatabaseContext _context;
        private readonly IMapper _mapper;



        public CourseService(NeptunReloadedDatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
