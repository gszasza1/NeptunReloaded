using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class RoomService : IRoomService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public RoomService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task createRoom(CreateRoom room)
        {
            if (room.Name == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var dbRoom = new Room()
            {
                Name = room.Name
            };

            _context.Rooms.Add(dbRoom);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task editRoom(EditRoom room)
        {
            if (room.Id == null || room.newName == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }

            var editRoom = _context.Rooms.FirstOrDefault(x => x.Id == room.Id);

            if (editRoom == null)
            {
                throw new InvalidOperationException("Nem létező szoba");
            }
            editRoom.Name = room.newName;

            _context.Rooms.Update(editRoom);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task<IEnumerable<Room>> listRooms() => await _context.Rooms.ToListAsync();
        public async Task<IEnumerable<Room>> listAvailableRooms()
        {
            return await _context.Rooms.Where(c => !c.IsDeleted && !_context.Courses.Select(b => b.RoomId).Contains(c.Id)).ToListAsync();
        }
    }
}