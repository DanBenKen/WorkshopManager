using AutoMapper;
using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Job, JobDTO>()
            .ForMember(dest => dest.WorkerName, opt => opt.MapFrom(src =>
                src.Worker != null ? $"{src.Worker.FirstName} {src.Worker.LastName}" : null));
            CreateMap<Job, RequestCreateJobDTO>();

            CreateMap<JobDTO, Job>();

            CreateMap<RequestCreateJobDTO, Job>();
            CreateMap<RequestCreateJobDTO, JobDTO>();
            CreateMap<RequestUpdateJobDTO, Job>();
            CreateMap<RequestUpdateJobDTO, JobDTO>();
        }
    }
}
