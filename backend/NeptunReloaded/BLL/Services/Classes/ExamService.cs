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

namespace NeptunReloaded.BLL.Services.Classes
{
    public class ExamService: IExamService
    {
        private readonly NeptunReloadedDatabaseContext _context;

        public ExamService(NeptunReloadedDatabaseContext context)
        {
            _context = context;
        }

        public async Task<Exam> createExam(User user, CreateExam exam)
        {
            Exam dbExam = null;

            try
            {
                //Check if user is teacher
                if (!user.IsTeacher)
                    return await Task.FromResult(dbExam); 
                
                //return null if same 
                List<Exam> exams = getExams().FindAll(s => s.Name == exam.Name);

                //Check if name is already in use
                if (exams.Count > 0)
                    return await Task.FromResult(dbExam); //return null if same task 

                dbExam = exam.mapToDBExam();

                _context.Exams.Add(dbExam);
                _context.SaveChanges();
            }
            catch (ArgumentNullException) { }


            return await Task.FromResult(dbExam);
        }

        public async Task<Exam> deleteExam(User user, Exam exam)
        {
            Exam dbExam = null;

            if (!user.IsTeacher)
                await Task.FromResult(dbExam);

            try
            {
                dbExam = getExams().Find(e => e.Id == exam.Id);

                if (dbExam != null)
                {

                    dbExam.IsDeleted = true;

                    _context.Update(dbExam);
                    _context.SaveChanges();
                }
            }
            catch (ArgumentNullException ) { }

            return await Task.FromResult(dbExam);
        }

        public async Task<Exam> editExam(User user, Exam exam)
        {
            Exam dbExam = null;

            if (!user.IsTeacher)
                await Task.FromResult(dbExam);

            try
            {
                dbExam = getExams().Find(e => e.Id == exam.Id);

                if (dbExam != null)
                {

                    dbExam.Name = exam.Name;

                   

                    _context.Update(dbExam);
                    _context.SaveChanges();
                }
            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(dbExam);
        }

        public async Task<ExamResult> joinExam(User user, Exam exam)
        {
            ExamResult dbExamResult = null;

            try
            {
                //Check if user is student
                if (user.IsTeacher)
                    return await Task.FromResult(dbExamResult);

                //return null if user is already applied for exam 
                List<ExamResult> examResults = getExamResults().FindAll(er => er.UserId == user.Id && er.ExamId == exam.Id);

                //Check if name is already in use
                if (examResults.Count > 0)
                    return await Task.FromResult(dbExamResult); //return null if same task 

                CreateExamResult examResult = new CreateExamResult { User = user, Exam = exam };
                dbExamResult = examResult.mapToDBExamResult();

                _context.ExamResults.Add(dbExamResult);
                _context.SaveChanges();
            }
            catch (ArgumentNullException) { }


            return await Task.FromResult(dbExamResult);
        }

        public async Task<ExamResult> leaveExam(User user, Exam exam)
        {
            ExamResult dbExamResult = null;

            try
            {
                //Find ExamResult that has not been evaluated yet <==> score  == -1
                ExamResult examResults = getExamResults().Find(er => er.UserId == user.Id && er.ExamId == exam.Id && er.Score == -1);

                if (examResults == null) {
                    return await Task.FromResult(dbExamResult);
                }

                examResults.IsDeleted = true;
                dbExamResult = examResults;

                _context.ExamResults.Update(dbExamResult);
                _context.SaveChanges();
            }
            catch (ArgumentNullException) { }


            return await Task.FromResult(dbExamResult);
        }

        public async Task<List<Exam>> listExams(string filterName = "")
        {
            List<Exam> exams = new List<Exam>();
            try
            {
                if (filterName.Length == 0)
                {
                    exams.AddRange(getExams());
                }
                else
                {
                    exams.AddRange(getExams().FindAll(e => e.Name.Contains(filterName)));
                }

            }
            catch (ArgumentNullException) { }

            return await Task.FromResult(exams);
        }

        //Return only non-deleted exams
        private List<Exam> getExams() {

            return _context.Exams.ToList().FindAll(e => e.IsDeleted == false);
        }

        private List<ExamResult> getExamResults()
        {
            return _context.ExamResults.ToList().FindAll(er => er.IsDeleted == false);
        }
    }
}
