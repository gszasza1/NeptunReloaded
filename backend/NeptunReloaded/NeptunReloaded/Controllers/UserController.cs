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

        public UserController(ILogger<UserController> logger, IUserService userService, ISubjectService subjectService , ICourseService courseService )
        {
            _logger = logger;
            _userService = userService;
            _subjectService = subjectService;
            _courseService = courseService;
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

        public List<Course> getUsers()
        {
            List<Course> list = new List<Course>();

            User userloggedIn = _userService.loginUser(new LoginUser { neptun = "DT8CE1", password = "0000" }).Result;

            //Course matek = _courseService.listCourses("3").Result.FirstOrDefault();

            list.AddRange ( _courseService.listCoursesForUser(userloggedIn).Result ) ;

            return list;
        }
    }
}
