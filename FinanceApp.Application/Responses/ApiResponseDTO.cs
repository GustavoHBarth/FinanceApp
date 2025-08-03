using System.Text.Json.Serialization;

namespace FinanceApp.Application.Responses
{
    public class ApiResponseDTO
    {
        [JsonPropertyOrder(-1)]
        public bool Success { get; set; }

        [JsonPropertyOrder(0)]
        public string? Message { get; set; }

        [JsonPropertyOrder(1)]
        public Dictionary<string, string>? Errors { get; set; }

        public static ApiResponseDTO Error(string message) => new ApiResponseDTO { Success = false, Message = message };
        public static ApiResponseDTO SuccessResponse(string message) => new ApiResponseDTO { Success = true, Message = message };
    }

    public class ApiResponseDTO<T> : ApiResponseDTO
    {
        [JsonPropertyOrder(2)]
        public T? Data { get; set; }

        public static ApiResponseDTO<T> SendSuccess(T data, string message = "")
        {
            return new ApiResponseDTO<T> { Success = true, Data = data, Message = message };
        }

        public static new ApiResponseDTO<T> SendError(string message)
        {
            return new ApiResponseDTO<T> { Success = false, Data = default, Message = message };
        }
    }

    public class ApiResponse<T> : ApiResponseDTO
    {
        [JsonPropertyOrder(2)]
        public T Data { get; set; }

        public static ApiResponse<T> SendSuccess(T data, string message = "")
        {
            return new ApiResponse<T> { Success = true, Data = data, Message = message };
        }

        public static new ApiResponse<T> SendError(string message)
        {
            return new ApiResponse<T> { Success = false, Data = default, Message = message };
        }
    }
}
