using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using WorkshopManager.Exceptions.JobExceptions;
using WorkshopManager.Exceptions.SupplyExceptions;
using WorkshopManager.Exceptions.WorkerExceptions;

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
            context.Request.EnableBuffering();

            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = exception switch
            {
                JobUpdateNullException => StatusCodes.Status404NotFound,
                JobCreationNullException => StatusCodes.Status404NotFound,
                JobNotFoundException => StatusCodes.Status404NotFound,
                WorkerNotFoundException => StatusCodes.Status404NotFound,
                SupplyNotFoundException => StatusCodes.Status404NotFound,
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

            _logger.LogError(exception, "Exception occurred during processing request. " +
                "Method: {Method}, Path: {Path}, User: {User}, Status Code: {StatusCode}, Request Body: {RequestBody}",
                context.Request.Method,
                context.Request.Path,
                context.User.Identity?.Name ?? "Anonymous",
                statusCode,
                await GetRequestBody(context));

            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/problem+json";

            await context.Response.WriteAsJsonAsync(new
            {
                title = exception.GetType().Name,
                detail = exception.Message,
                status = statusCode,
                code = Guid.NewGuid(),
            });
        }

        private async Task<string> GetRequestBody(HttpContext context)
        {
            try
            {
                context.Request.Body.Seek(0, SeekOrigin.Begin);

                using (var reader = new StreamReader(context.Request.Body))
                {
                    var body = await reader.ReadToEndAsync();

                    if (body.Length > 1048576)
                    {
                        return "Large payload, body not logged.";
                    }
                    return body;
                }
            }
            catch (Exception ex)
            {
                return $"Failed to read request body: {ex.Message}";
            }
        }
    }
}
