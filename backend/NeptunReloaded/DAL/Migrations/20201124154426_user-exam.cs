using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NeprunReloaded.DAL.Migrations
{
    public partial class userexam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserExams",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    ExamId = table.Column<int>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserExams", x => new { x.UserId, x.ExamId });
                    table.ForeignKey(
                        name: "FK_UserExams_Exams_ExamId",
                        column: x => x.ExamId,
                        principalTable: "Exams",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserExams_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserExams_ExamId",
                table: "UserExams",
                column: "ExamId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserExams");
        }
    }
}
