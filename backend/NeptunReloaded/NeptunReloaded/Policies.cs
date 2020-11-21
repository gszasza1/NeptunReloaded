using Microsoft.AspNetCore.Authorization;


namespace NeptunReloaded.API
{
    public class Policies
    {
        public const string Teacher = "Teacher";
        public const string Student = "Student";
        public static AuthorizationPolicy TeacherPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Teacher).Build();
        }
        public static AuthorizationPolicy StudentPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Student).Build();
        }
    }
}