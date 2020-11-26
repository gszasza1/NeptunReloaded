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
    public class CourseResultController : ControllerBase
    {
        private readonly ICourseResultService _courseResultService;

        public CourseResultController(ICourseResultService courseResultService)
        {
            _courseResultService = courseResultService;
        }

        [HttpPost]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> Create([FromBody] CreateCourseResult result)
        {
            try
            {
                await _courseResultService.CreateCourseResult(result);
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
        public async Task<ActionResult> Edit([FromBody] EditCourseResult result)
        {
            try
            {
                await _courseResultService.EditCourseResult(result);
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

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var userResult = await _courseResultService.ListCourseResults();
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
        [HttpGet("self")]
        [Authorize(Roles = Role.Student)]
        public async Task<IActionResult> GetUserAll()
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                var userResult = await _courseResultService.ListUserCourseResults(userId);
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
