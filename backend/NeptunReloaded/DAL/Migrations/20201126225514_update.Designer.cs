﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NeptunReloaded.DAL;

namespace NeprunReloaded.DAL.Migrations
{
    [DbContext(typeof(NeptunReloadedDatabaseContext))]
    [Migration("20201126225514_update")]
    partial class update
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.Course", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("RoomId")
                        .HasColumnType("int");

                    b.Property<int?>("SubjectId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.HasIndex("SubjectId");

                    b.HasIndex("UserId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.CourseResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("UserId");

                    b.ToTable("CourseResults");
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.Exam", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Exams");
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.Subject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.UserCourse", b =>
                {
                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<int?>("CourseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.HasKey("UserId", "CourseId");

                    b.HasIndex("CourseId");

                    b.ToTable("UserCourses");
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.UserExam", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ExamId")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExamId");

                    b.HasIndex("UserId");

                    b.ToTable("UserExams");
                });

            modelBuilder.Entity("NeptunReloaded.DAL.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Neptun")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.Course", b =>
                {
                    b.HasOne("NeprunReloaded.DAL.Entities.Room", "Room")
                        .WithMany("Courses")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("NeprunReloaded.DAL.Entities.Subject", "Subject")
                        .WithMany("Courses")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("NeptunReloaded.DAL.Entities.User", "User")
                        .WithMany("Courses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction);
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.CourseResult", b =>
                {
                    b.HasOne("NeprunReloaded.DAL.Entities.Course", "Course")
                        .WithMany("CourseResults")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("NeptunReloaded.DAL.Entities.User", "User")
                        .WithMany("CourseResults")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.Exam", b =>
                {
                    b.HasOne("NeprunReloaded.DAL.Entities.Course", "Course")
                        .WithMany("Exams")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.UserCourse", b =>
                {
                    b.HasOne("NeprunReloaded.DAL.Entities.Course", "Course")
                        .WithMany("UserCourses")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("NeptunReloaded.DAL.Entities.User", "User")
                        .WithMany("UserCourses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("NeprunReloaded.DAL.Entities.UserExam", b =>
                {
                    b.HasOne("NeprunReloaded.DAL.Entities.Exam", "Exam")
                        .WithMany("UserExams")
                        .HasForeignKey("ExamId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("NeptunReloaded.DAL.Entities.User", "User")
                        .WithMany("UserExams")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction);
                });
#pragma warning restore 612, 618
        }
    }
}
