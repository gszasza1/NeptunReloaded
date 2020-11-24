using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeprunReloaded.DAL.Additional;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Classes;
using NeptunReloaded.BLL.Services.Interfaces;
using System;
using System.Collections.Generic;
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
            catch
            {
                return BadRequest("Hiba történt");
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
                return BadRequest(e);
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
                return BadRequest(e);
            }

        }

    }
}
