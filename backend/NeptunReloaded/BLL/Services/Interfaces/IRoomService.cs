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
        public Task<IEnumerable<Room>> listRooms();
        public Task createRoom(CreateRoom room);
        public Task editRoom(EditRoom room);
        public Task<IEnumerable<Room>> listAvailableRooms();

    }
}
