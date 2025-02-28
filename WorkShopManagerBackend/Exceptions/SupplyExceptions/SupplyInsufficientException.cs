namespace WorkshopManager.Exceptions.SupplyExceptions
{
    public class SupplyInsufficientException : Exception
    {
        public SupplyInsufficientException(int supplyId)
            : base($"Supply with ID {supplyId} does not have sufficient quantity.") { }
    }
}
