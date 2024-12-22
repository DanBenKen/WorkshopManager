namespace WorkshopManager.Exceptions.SupplyExceptions
{
    public class SupplyCreateNullException : Exception
    {
        public SupplyCreateNullException()
            : base($"Supply create fail.") { }
    }
}
