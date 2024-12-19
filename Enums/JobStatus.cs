using System.Runtime.Serialization;

namespace WorkshopManager.Enums
{
    public enum JobStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,

        [EnumMember(Value = "InProgress")]
        InProgress,

        [EnumMember(Value = "Completed")]
        Completed
    }

}
