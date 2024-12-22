namespace WorkshopManager.Exceptions.SupplyExceptions
{
    public class SupplyGetNullException : Exception
    {
        public SupplyGetNullException()
            : base($"Getting supply failed.") { }
    }
}
