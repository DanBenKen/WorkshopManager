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
                .ForMember(dest => dest.SupplyQuantity, opt => opt.MapFrom(src => src.Supply != null ? src.Supply.Quantity : (int?)null));

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
