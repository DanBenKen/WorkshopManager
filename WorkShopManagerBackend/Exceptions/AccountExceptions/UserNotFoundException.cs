namespace WorkshopManager.Exceptions.AccountExceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException()
            : base("User with the provided email was not found.") { }
    }
}
