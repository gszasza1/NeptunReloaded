using AutoMapper;
using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using NeptunReloaded.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using NeprunReloaded.DAL.Additional;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class RoomService : IRoomService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public RoomService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task<Room> createRoom(User user ,CreateRoom room)
        {
            Room dbRoom = null;

            try
            {
               List<Room> matches =  _context.Rooms.ToList().FindAll(r => r.Name == room.Name);

                if(matches.Count > 0 || user.Role == Role.Student)
                    return await Task.FromResult(dbRoom);

                dbRoom = room.mapToDBRoom();

                _context.Rooms.Add(dbRoom);
                _context.SaveChanges();
            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(dbRoom);
        }

        public async Task<Room> editRoom(User user, Room room)
        {
            Room dbRoom = null;

            try
            {
              Room match = _context.Rooms.ToList().Find(r => r.Id == room.Id);

                if (match == null || user.Role == Role.Student)
                    return await Task.FromResult(dbRoom);

                dbRoom = match;
                dbRoom.Name = room.Name;

                _context.Rooms.Update(dbRoom);
                _context.SaveChanges();
            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(dbRoom);
        }

        public async Task<List<Room>> listRooms()
        {
            List<Room> rooms = new List<Room>();

            try
            {
                rooms.AddRange(_context.Rooms.ToList());
            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(rooms);
        }
    }
}
