namespace FinanceApp.Application.Exceptions
{
    public class ValidationAppException : Exception
    {
        public IDictionary<string, string[]> Errors { get; }

        public ValidationAppException(string message, IDictionary<string, string[]> erros) : base(message)
        {
            Errors = erros;
        }
    }
}
