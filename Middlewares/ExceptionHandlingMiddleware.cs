using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace WorkshopManager.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = exception switch
            {
                ArgumentException => StatusCodes.Status400BadRequest,
                KeyNotFoundException => StatusCodes.Status404NotFound,
                UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
                InvalidOperationException => StatusCodes.Status400BadRequest,
                ValidationException => StatusCodes.Status400BadRequest,
                TimeoutException => StatusCodes.Status408RequestTimeout,
                NotImplementedException => StatusCodes.Status501NotImplemented,
                DbUpdateException => StatusCodes.Status500InternalServerError,
                _ => StatusCodes.Status500InternalServerError
            };

            _logger.LogError(exception, "Exception occurred during processing request at {Path}. User: {User}.",
                context.Request.Path,
                context.User.Identity?.Name ?? "Anonymous");

            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/problem+json";

            return context.Response.WriteAsJsonAsync(new
            {
                title = exception.GetType().Name,
                detail = exception.Message,
                status = statusCode
            });
        }
    }
}
