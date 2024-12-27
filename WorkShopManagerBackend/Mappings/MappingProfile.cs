using AutoMapper;
using WorkshopManager.DTOs.JobDTOs;
using WorkshopManager.DTOs.SupplyDTOs;
using WorkshopManager.DTOs.WorkerDTOs;
using WorkshopManager.Models;

namespace WorkshopManager.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Job, JobDTO>()
                .ForMember(dest => dest.WorkerName, opt => opt.MapFrom(src => src.Worker != null ? src.Worker.FullName : null))
                .ForMember(dest => dest.SupplyId, opt => opt.MapFrom(src => src.SupplyId));

            CreateMap<JobDTO, Job>();
            CreateMap<RequestCreateJobDTO, JobDTO>();
            CreateMap<RequestUpdateJobDTO, JobDTO>();

            CreateMap<Supply, SupplyDTO>();
            CreateMap<SupplyDTO, Supply>();
            CreateMap<RequestCreateSupplyDTO, SupplyDTO>();
            CreateMap<RequestUpdateSupplyDTO, SupplyDTO>();

            CreateMap<Worker, WorkerDTO>();
            CreateMap<WorkerDTO, Worker>();
            CreateMap<RequestCreateWorkerDTO, WorkerDTO>();
            CreateMap<RequestUpdateWorkerDTO, WorkerDTO>();
            CreateMap<WorkerWithJobDTO, JobDTO>();
        }
    }
}
