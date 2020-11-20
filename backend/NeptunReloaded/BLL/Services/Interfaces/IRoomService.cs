using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NeptunReloaded.BLL.Services.Interfaces
{
    public interface IRoomService
    {
        public Task<List<Room>> listRooms();
        public Task<Room> createRoom(User user, CreateRoom room);
        public Task<Room> editRoom(User user, Room room);

    }
}
