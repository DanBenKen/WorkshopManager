namespace WorkshopManager.Exceptions
{
    public class SupplyNotFoundException : Exception
    {
        public SupplyNotFoundException(int supplyId)
            : base($"Supply with ID {supplyId} not found.") { }
    }
}
