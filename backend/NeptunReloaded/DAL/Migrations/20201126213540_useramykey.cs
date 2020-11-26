using Microsoft.EntityFrameworkCore.Migrations;

namespace NeprunReloaded.DAL.Migrations
{
    public partial class useramykey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserExams",
                table: "UserExams");

            migrationBuilder.AlterColumn<int>(
                name: "ExamId",
                table: "UserExams",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "UserExams",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserExams",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserExams",
                table: "UserExams",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserExams_UserId",
                table: "UserExams",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserExams",
                table: "UserExams");

            migrationBuilder.DropIndex(
                name: "IX_UserExams_UserId",
                table: "UserExams");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserExams");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "UserExams",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ExamId",
                table: "UserExams",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserExams",
                table: "UserExams",
                columns: new[] { "UserId", "ExamId" });
        }
    }
}
