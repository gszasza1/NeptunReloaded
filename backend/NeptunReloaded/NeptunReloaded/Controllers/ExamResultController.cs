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
    public class ExamResultController : ControllerBase
    {
        private readonly IExamResultService _examResultService;

        public ExamResultController(IExamResultService examResultService)
        {
            _examResultService = examResultService;
        }

        [HttpPost]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> Create([FromBody] CreateExamResult result)
        {
            try
            {
                await _examResultService.createExamResult(result);
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
        public async Task<ActionResult> Edit([FromBody] EditExamResult result)
        {
            try
            {
                await _examResultService.editExamResult(result);
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
                var userResult = await _examResultService.ListExamResults();
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
