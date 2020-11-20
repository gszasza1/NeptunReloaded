using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NeprunReloaded.DAL.Migrations
{
    public partial class update_userCoures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "UserCourses",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserCourses",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "UserCourses");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserCourses");
        }
    }
}
