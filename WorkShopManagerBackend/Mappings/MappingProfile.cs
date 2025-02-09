﻿using AutoMapper;
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
                .ForMember(dest => dest.WorkerName, opt => opt.MapFrom(src => src.Worker != null ? src.Worker.FullName : null));

            CreateMap<JobDTO, Job>();
            CreateMap<RequestCreateJobDTO, JobDTO>();
            CreateMap<RequestUpdateJobDTO, JobDTO>();

            CreateMap<Supply, SupplyDTO>();
            CreateMap<SupplyDTO, Supply>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<RequestCreateSupplyDTO, SupplyDTO>();
            CreateMap<RequestUpdateSupplyDTO, SupplyDTO>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<Worker, WorkerDTO>();
            CreateMap<WorkerDTO, Worker>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Jobs, opt => opt.Ignore());
            CreateMap<RequestCreateWorkerDTO, WorkerDTO>();
            CreateMap<RequestUpdateWorkerDTO, WorkerDTO>();
            CreateMap<WorkerWithJobDTO, JobDTO>();
        }
    }
}
