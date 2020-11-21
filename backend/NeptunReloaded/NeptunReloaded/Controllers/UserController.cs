using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Classes;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL.Entities;

namespace NeptunReloaded.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly ISubjectService _subjectService;
        private readonly ICourseService _courseService;
        private readonly IRoomService _roomService;
        private readonly IExamService _examService;
        private readonly IExamResultService _examResultService;

        public UserController(ILogger<UserController> logger, IUserService userService, ISubjectService subjectService , ICourseService courseService, IRoomService roomService, IExamService examService, IExamResultService examResultService)
        {
            _logger = logger;
            _userService = userService;
            _subjectService = subjectService;
            _courseService = courseService;
            _roomService = roomService;
            _examService = examService;
            _examResultService =  examResultService;
        }
        
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterUser user) {

            try
            {
               var userResult=  _userService.registerUser(user).Result;
                return Ok(userResult);
            }
            catch
            {
                return BadRequest("sikertelen shit");
            }
        
        
        }

        [HttpPost]
        public void Post()
        {
            //var rng = new Random();
            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //    Date = DateTime.Now.AddDays(index),
            //    TemperatureC = rng.Next(-20, 55),
            //    Summary = Summaries[rng.Next(Summaries.Length)]
            //})
            //.ToArray();
        }

        [HttpGet]
        public List<ExamResult> getUsers()
        {
            List<ExamResult> list = new List<ExamResult>();

            User userloggedIn = _userService.loginUser(new LoginUser { neptun = "DT8CE1", password = "0000" }).Result;
            userloggedIn.IsTeacher = false;

            Course matek = _courseService.listCourses("3").Result.FirstOrDefault();

            Exam exam8 = _examService.listExams("4").Result.FirstOrDefault();

            ExamResult ee = _examResultService.ListExamResults("DT8CE1").Result.FindAll(er => er.ExamId == exam8.Id).FirstOrDefault();

            _examService.leaveExam(userloggedIn, exam8);

            list.AddRange(_examResultService.ListExamResults().Result);

            return list;
        }
    }
}
