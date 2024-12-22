namespace WorkshopManager.Exceptions.SupplyExceptions
{
    public class SupplyUpdateNullException : Exception
    {
        public SupplyUpdateNullException()
            : base($"Supply update failed.") { }
    }
}
