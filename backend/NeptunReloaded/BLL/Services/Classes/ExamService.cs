﻿using NeprunReloaded.DAL.Entities;
using NeptunReloaded.BLL.Models.Received;
using NeptunReloaded.BLL.Services.Interfaces;
using NeptunReloaded.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NeptunReloaded.BLL.Models.Send;
using Microsoft.EntityFrameworkCore;

namespace NeptunReloaded.BLL.Services.Classes
{
    public class ExamService: IExamService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public ExamService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task createExam(CreateExam exam)
        {
            if (exam.Name == null || exam.CourseId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var dbExam = new Exam()
            {
                Name = exam.Name,
                CourseId=exam.CourseId
            };

            _context.Exams.Add(dbExam);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task deleteExam(int examId)
        {
            if (examId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var deleteExam = _context.Exams.FirstOrDefault(x => x.Id == examId);

            _context.Exams.Remove(deleteExam);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task editExam(EditExam exam)
        {
            if (exam.newName == null || exam.Id == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var editExam= _context.Exams.FirstOrDefault(x => x.Id == exam.Id);

            if (editExam == null)
            {
                throw new InvalidOperationException("Nem létező szoba");
            }
            editExam.Name = exam.newName;

            _context.Exams.Update(editExam);
            await _context.SaveChangesAsync();

            return;

        }

        public async Task joinExam(int userId, JoinExam exam)
        {
            if (exam.ExamId == null || userId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var joinExam =  await _context.UserExams.FirstOrDefaultAsync(x => x.IsDeleted == false && x.ExamId == exam.ExamId && x.UserId==userId);
            if (joinExam != null)
            {
                throw new InvalidOperationException("Már jelentkezett vizsgára");
            }
            await _context.UserExams.AddAsync(new UserExam() { ExamId=exam.ExamId,UserId=userId});
            await _context.SaveChangesAsync();

            return;
        }

        public async Task leaveExam(int userId, LeaveExam exam)
        {
            if (exam.ExamId == null || userId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            var leaveExam = await _context.UserExams.FirstOrDefaultAsync(x =>x.IsDeleted==false&& x.ExamId == exam.ExamId && x.UserId == userId);
            if (leaveExam == null)
            {
                throw new InvalidOperationException("Még nem jelentkezett vizsgára");
            }
             _context.UserExams.Remove(leaveExam);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task<IEnumerable<Exam>> listAllUserJoinedExams(int userId)
        {
            if (userId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            return await _context.UserExams.Where(c => !c.IsDeleted).Where(x => x.UserId == userId).Include(t=>t.Exam).Select(y=> y.Exam).ToListAsync();

        }

        public async Task<IEnumerable<UserListExam>> listExams(int userId)
        {
            if (userId == null)
            {
                throw new InvalidOperationException("Hibás adatok");
            }
            return await _context.Exams.Where(c => !c.IsDeleted).Include(x=>x.UserExams).Select(t=>new UserListExam() { Id=t.Id,Name=t.Name,Joined=t.UserExams.Any(c=>c.UserId==userId && !c.IsDeleted)}). ToListAsync();
        }

        public async Task<IEnumerable<ExamSelect>> listExamsSelect(int userId)
        {
            return await _context.Exams.Where(c => !c.IsDeleted).Select(y => new ExamSelect() { Id = y.Id, Name = y.Name }).ToListAsync();
        }
    }
}
