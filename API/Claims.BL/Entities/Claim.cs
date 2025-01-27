namespace Claims.BL.Entities
{
    public class Claim
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string PAN { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public int ClaimType { get; set; }
    }
}
