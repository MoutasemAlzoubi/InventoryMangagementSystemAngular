using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementAPI.Data
{
    public class InventoryContext : IdentityDbContext<ApplicationUser>
    {
        public InventoryContext(DbContextOptions<InventoryContext> options) : base(options) { }

        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<WareHouse> WareHouses { get; set; }
        public DbSet<WareHouseItem> WareHouseItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Country → City (Cascade)
            modelBuilder.Entity<City>()
                .HasOne(c => c.Country)
                .WithMany(cn => cn.Cities)
                .HasForeignKey(c => c.Country_Id)
                .OnDelete(DeleteBehavior.Cascade);

            // City → WareHouse (Cascade)
            modelBuilder.Entity<WareHouse>()
                .HasOne(w => w.City)
                .WithMany(c => c.WareHouses)
                .HasForeignKey(w => w.City_Id)
                .OnDelete(DeleteBehavior.Cascade);

            // Country → WareHouse (NoAction) لتجنب Multiple Cascade Paths
            modelBuilder.Entity<WareHouse>()
                .HasOne(w => w.Country)
                .WithMany(cn => cn.WareHouses)
                .HasForeignKey(w => w.Country_Id)
                .OnDelete(DeleteBehavior.NoAction);

            // WareHouse → WareHouseItem (Cascade)
            modelBuilder.Entity<WareHouseItem>()
                .HasOne(i => i.WareHouse)
                .WithMany(w => w.WareHouseItems)
                .HasForeignKey(i => i.WareHouse_Id)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
