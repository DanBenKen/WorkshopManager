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
                .ForMember(dest => dest.WorkerName, opt => opt.MapFrom(src => src.Worker.FullName))
                .ForMember(dest => dest.SupplyName, opt => opt.MapFrom(src => src.Supply.Name));
            CreateMap<JobDTO, Job>();
            CreateMap<RequestCreateJobDTO, Job>();
            CreateMap<RequestUpdateJobDTO, Job>();

            CreateMap<Supply, SupplyDTO>();
            CreateMap<SupplyDTO, Supply>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<RequestCreateSupplyDTO, SupplyDTO>();
            CreateMap<RequestCreateSupplyDTO, Supply>();
            CreateMap<RequestUpdateSupplyDTO, SupplyDTO>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<RequestUpdateSupplyDTO, Supply>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<Worker, WorkerWithJobDTO>()
                .ForMember(dest => dest.WorkerId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.WorkerName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.Jobs, opt => opt.MapFrom(src => src.Jobs));
            CreateMap<Worker, WorkerDTO>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));
            CreateMap<WorkerDTO, Worker>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Jobs, opt => opt.Ignore());
            CreateMap<RequestCreateWorkerDTO, WorkerDTO>();
            CreateMap<RequestCreateWorkerDTO, Worker>();
            CreateMap<Worker, RequestCreateWorkerDTO>();
            CreateMap<RequestUpdateWorkerDTO, WorkerDTO>();
            CreateMap<RequestUpdateWorkerDTO, Worker>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<WorkerWithJobDTO, JobDTO>();
        }
    }
}
