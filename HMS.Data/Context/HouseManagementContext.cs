using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using HMS.Data.Models;

#nullable disable

namespace HMS.Data.Context
{
    public partial class HouseManagementContext : DbContext
    {
        public HouseManagementContext()
        {
        }

        public HouseManagementContext(DbContextOptions<HouseManagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Expense> Expenses { get; set; }
        public virtual DbSet<House> Houses { get; set; }
        public virtual DbSet<Manager> Managers { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
        public virtual DbSet<Provider> Providers { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<Settler> Settlers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=HouseManagementDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Address>(entity =>
            {
                entity.Property(e => e.AddressId)
                    .HasColumnName("address_id");

                entity.Property(e => e.BuildingNumber)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("building_number");

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("city");

                entity.Property(e => e.Street)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("street");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.ContactsId)
                    .HasName("PK__Contacts__D0726B3A1137D6AA");

                entity.Property(e => e.ContactsId)
                    .ValueGeneratedNever()
                    .HasColumnName("contacts_id");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Phone)
                    .HasMaxLength(13)
                    .HasColumnName("phone");
            });

            modelBuilder.Entity<Expense>(entity =>
            {
                entity.Property(e => e.ExpenseId)
                    .ValueGeneratedNever()
                    .HasColumnName("expense_id");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.HouseId).HasColumnName("house_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.ServiceId).HasColumnName("service_id");

                entity.HasOne(d => d.House)
                    .WithMany(p => p.Expenses)
                    .HasForeignKey(d => d.HouseId)
                    .HasConstraintName("FK__Expenses__house___59063A47");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.Expenses)
                    .HasForeignKey(d => d.ServiceId)
                    .HasConstraintName("FK__Expenses__servic__5812160E");
            });

            modelBuilder.Entity<House>(entity =>
            {
                entity.Property(e => e.HouseId)
                    .ValueGeneratedNever()
                    .HasColumnName("house_id");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Houses)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Houses__address___48CFD27E");

                entity.HasMany(x => x.Persons)
                    .WithOne(p => p.House)
                    .HasForeignKey(x => x.HouseId);

                entity.Property(e => e.MeterPayment)
                    .HasColumnName("meter_payment");
            });

            modelBuilder.Entity<Manager>(entity =>
            {
                entity.HasKey(e => e.PersonId)
                    .HasName("PK__Managers__543848DF6FBEE96E");

                entity.Property(e => e.PersonId)
                    .ValueGeneratedNever()
                    .HasColumnName("person_id");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("password");

                entity.Property(e => e.Role)
                    .HasMaxLength(20)
                    .HasColumnName("role");

                entity.HasOne(d => d.Person)
                    .WithOne()
                    .HasForeignKey<Manager>(d => d.PersonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Managers__person__5165187F");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.PaymentId)
                    .ValueGeneratedNever()
                    .HasColumnName("payment_id");

                entity.Property(e => e.Amount)
                    .HasColumnType("money")
                    .HasColumnName("amount");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.PersonId).HasColumnName("person_id");

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.PersonId)
                    .HasConstraintName("FK__Payments__person__5BE2A6F2");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.Property(e => e.PersonId)
                    .ValueGeneratedNever()
                    .HasColumnName("person_id");

                entity.Property(e => e.HouseId).HasColumnName("house_id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("surname");

                entity.HasOne(d => d.House)
                    .WithMany(p => p.Persons)
                    .HasForeignKey(d => d.HouseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Persons__house_i__4BAC3F29");
            });

            modelBuilder.Entity<Provider>(entity =>
            {
                entity.Property(e => e.ProviderId)
                    .ValueGeneratedNever()
                    .HasColumnName("provider_id");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.ContactId).HasColumnName("contact_id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Providers)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Providers__addre__3E52440B");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.Providers)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK__Providers__conta__3F466844");
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(e => e.ServiceId)
                    .ValueGeneratedNever()
                    .HasColumnName("service_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .HasColumnName("description");

                entity.Property(e => e.Measurement)
                    .HasMaxLength(20)
                    .HasColumnName("measurement");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Price)
                    .HasColumnType("money")
                    .HasColumnName("price");

                entity.Property(e => e.ProviderId).HasColumnName("provider_id");

                entity.HasOne(d => d.Provider)
                    .WithMany(p => p.Services)
                    .HasForeignKey(d => d.ProviderId)
                    .HasConstraintName("FK__Services__provid__4222D4EF");
            });

            modelBuilder.Entity<Settler>(entity =>
            {
                entity.HasKey(e => e.PersonId)
                    .HasName("PK__Settlers__543848DF19D36CFF");

                entity.Property(e => e.PersonId)
                    .ValueGeneratedNever()
                    .HasColumnName("person_id");

                entity.Property(e => e.ContactId).HasColumnName("contact_id");

                entity.Property(e => e.FlatArea).HasColumnName("flat_area");

                entity.Property(e => e.FlatNumber).HasColumnName("flat_number");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.Settlers)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK__Settlers__contac__5535A963");

                entity.HasOne(d => d.Person)
                    .WithOne()
                    .HasForeignKey<Settler>(d => d.PersonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Settlers__person__5441852A");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
