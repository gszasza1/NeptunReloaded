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
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpPost]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> Create([FromBody] CreateRoom room)
        {
            try
            {
                 await _roomService.createRoom(room);
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
        public async Task<ActionResult> EditRoom([FromBody] EditRoom room)
        {
            try
            {
                await _roomService.editRoom(room);
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
        public async Task<IActionResult> GetAllRoom()
        {
            try
            {
                var userResult = await _roomService.listRooms();
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

        [HttpGet("available")]
        [Authorize(Roles = Role.Teacher)]
        public async Task<IActionResult> GetUsers()
        {

            try
            {
                var userResult = await _roomService.listAvailableRooms();
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
