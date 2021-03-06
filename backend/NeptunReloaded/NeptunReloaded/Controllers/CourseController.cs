﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using NeprunReloaded.DAL.Additional;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace NeptunReloaded.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPost]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> Create([FromBody] CreateCourse course)
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                await _courseService.createCourse(userId, course);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest("Hiba történt: " + e.Message);
            }

        }
        [HttpPut]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> Edit([FromBody] EditCourse course)
        {
            try
            {
                await _courseService.editCourse(course);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest("Hiba történt: " + e.Message);
            }

        }
        [HttpPost("join")]
        [Authorize(Roles = Role.Student)]
        public async Task<ActionResult> JoinCourse([FromBody] JoinCourse course)
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                await _courseService.joinCourse(userId, course);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest("Hiba történt: " + e.Message);
            }

        }

        [HttpGet("subject/{subjectId}")]
        [Authorize]
        public async Task<ActionResult> GetAllCourseBySubject(int subjectId)
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                var userResult = await _courseService.listCoursesBySubject(userId, subjectId);
                return Ok(userResult);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest("Hiba történt: " + e.Message);
            }

        }

        [HttpGet]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var userResult = await _courseService.listCourses();
                return Ok(userResult);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest("Hiba történt: " + e.Message);
            }

        }
        [HttpGet("select")]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> ListCoursesSelect()
        {
            try
            {
                var userResult = await _courseService.listCoursesSelect();
                return Ok(userResult);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest("Hiba történt: " + e.Message);
            }

        }
        [HttpGet("select/self")]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> ListTeacherAllCourses()
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                var userResult = await _courseService.listTeacherAllCourses(userId);
                return Ok(userResult);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest("Hiba történt: " + e.Message);
            }

        }
    }
}
