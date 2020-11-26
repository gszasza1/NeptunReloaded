using Microsoft.AspNetCore.Authorization;
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
    public class ExamController : ControllerBase
    {
        private readonly IExamService _examService;

        public ExamController(IExamService examService)
        {
            _examService = examService;
        }

        [HttpPost]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> Create([FromBody] CreateExam exam)
        {
            try
            {
                 await _examService.createExam(exam);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch
            {
                return BadRequest("Hiba történt");
            }

        }
        [HttpPut]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> Edit([FromBody] EditExam exam)
        {
            try
            {
                await _examService.editExam(exam);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch
            {
                return BadRequest("Hiba történt");
            }

        }
        [HttpDelete("{examId}")]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> Delete(int examId)
        {
            try
            {
                 await _examService.deleteExam(examId);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch
            {
                return BadRequest("Hiba történt");
            }

        }

        [HttpPost("join")]
        [Authorize(Roles = Role.Student)]
        public async Task<ActionResult> JoinExam([FromBody] JoinExam exam)
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                await _examService.joinExam(userId, exam);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch
            {
                return BadRequest("Hiba történt");
            }

        }
        [HttpPost("leave")]
        [Authorize(Roles = Role.Student)]
        public async Task<ActionResult> LeaveExam([FromBody] LeaveExam exam)
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                await _examService.leaveExam(userId, exam);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch
            {
                return BadRequest("Hiba történt");
            }

        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult> GetAllExamForUser()
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                var userResult = await _examService.listExams(userId);
                return Ok(userResult);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch
            {
                return BadRequest("Hiba történt");
            }

        }

        [HttpGet("joined")]
        [Authorize]
        public async Task<ActionResult> GetAllJoinedExamForUser()
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                var userResult = await _examService.listAllUserJoinedExams(userId);
                return Ok(userResult);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch
            {
                return BadRequest("Hiba történt");
            }

        }

        [HttpGet("select")]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> ListExamsSelect()
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                var userResult = await _examService.listExams(userId);
                return Ok(userResult);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch
            {
                return BadRequest("Hiba történt");
            }

        }
        [HttpGet("select/courses")]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> ListCoursesSelect()
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                var userResult = await _examService.listExamsSelect(userId);
                return Ok(userResult);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch
            {
                return BadRequest("Hiba történt");
            }

        }
    }
}
