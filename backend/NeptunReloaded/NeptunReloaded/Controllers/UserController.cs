using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeprunReloaded.DAL.Additional;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL.Entities;

namespace NeptunReloaded.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult> Register([FromBody] RegisterUser user)
        {
            try
            {
                var userResult = await _userService.registerUser(user);
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

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login([FromBody] LoginUser user)
        {
            try
            {
                var userResult = await _userService.loginUser(user);
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

        [HttpPost("username")]
        [Authorize]
        public async Task<ActionResult> ChangeUsername([FromBody] ChangeUsername newName)
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                await _userService.changeName(userId, newName.value);
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

        [HttpPost("password")]
        [Authorize]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePassword newPassword)
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                await _userService.changePassword(userId, newPassword.value);
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

        [HttpPost("role")]
        [Authorize(Roles = Role.Teacher)]
        public async Task<ActionResult> ChangeUserRole([FromBody] ChangeUserRole changeUser)
        {
            try
            {
                await _userService.changeUserRole(changeUser.userId, changeUser.newRole);
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
        [HttpGet("profil")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value);
            try
            {
                var user = await _userService.viewProfile(userId);
                return Ok(new User()
                {
                    Id = user.Id,
                    Role = user.Role,
                    Neptun = user.Neptun,
                    CreatedAt = user.CreatedAt,
                    LastName = user.LastName,
                    FirstName = user.FirstName,
                    Username = user.Username
                });
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
        public async Task<IActionResult> GetUsers()
        {

            try
            {
                return Ok(await _userService.GetAllUser());
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
        [HttpGet("select/on-course/{courseId}")]
        [Authorize(Roles = Role.Teacher)]
        public async Task<IActionResult> GetAllStudentsOCourse(int courseId)
        {

            try
            {
                return Ok(await _userService.GetAllUserInCourse(courseId));
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest("Hiba történt: " +e.Message);
            }
        }
        


    }
}
