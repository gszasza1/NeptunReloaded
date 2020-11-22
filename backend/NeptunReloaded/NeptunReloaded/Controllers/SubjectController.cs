using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeprunReloaded.DAL.Additional;
using NeptunReloaded.BLL.Models.Received;
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
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectService _subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [HttpPost]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> Create([FromBody] CreateSubject subject)
        {
            try
            {
                await _subjectService.createSubject(subject);
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
        public async Task<ActionResult> EditRoom([FromBody] EditSubject subject)
        {
            try
            {
                await _subjectService.editSubject(subject);
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
        public async Task<IActionResult> GetAllRoom()
        {
            try
            {
                var subjectResult = await _subjectService.listSubjects();
                return Ok(subjectResult);
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
        [HttpGet("select")]
        [Authorize]
        public async Task<IActionResult> GetAllRoomSelect()
        {
            try
            {
                var subjectResult = await _subjectService.listSubjects();
                return Ok(subjectResult);
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