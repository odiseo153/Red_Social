using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infraestructure.Context
{
    public class RedSocialContext : DbContext
    {
        public RedSocialContext(DbContextOptions<RedSocialContext> options)
       : base(options)
        {
        }

        /*
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            if (!optionsBuilder.IsConfigured)
            {
                // Configuración de la cadena de conexión, si no está configurada ya en ConfigureServices
                optionsBuilder.UseSqlServer("Server=odiseo\\ODISEO;Database=Red_Social;User Id=odiseo;Password=padomo153;TrustServerCertificate=True;");
            }
        }
        */

        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<UserFollower> UserFollowers { get; set; }

        public DbSet<Conversation> Conversations { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Conversation>()
           .HasOne(c => c.User1)
           .WithMany()
           .HasForeignKey(c => c.User1Id)
           .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Conversation>()
                .HasOne(c => c.User2)
                .WithMany()
                .HasForeignKey(c => c.User2Id)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()                
              .HasMany(u => u.Posts)
              .WithOne(p => p.User)
              .HasForeignKey(p => p.UserId)
              .OnDelete(DeleteBehavior.Cascade); // Eliminar posts en cascada cuando se elimina un usuario

            // Configuración de la relación de User con UserFollower para los seguidores
            modelBuilder.Entity<User>()
                .HasMany(u => u.Followers)
                .WithOne(uf => uf.Following)
                .HasForeignKey(uf => uf.FollowingId)
                .OnDelete(DeleteBehavior.NoAction); // No eliminar seguido si hay relaciones de seguimiento

            // Configuración de la relación de User con UserFollower para los seguidos
            modelBuilder.Entity<User>()
                .HasMany(u => u.Following)
                .WithOne(uf => uf.Follower)
                .HasForeignKey(uf => uf.FollowerId)
                .OnDelete(DeleteBehavior.NoAction);

            // Configuración de la relación de User con Post
            modelBuilder.Entity<Post>()
                .HasOne(p => p.User)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Eliminar posts en cascada cuando se elimina un usuario

            // Configuración de la relación de Post con Comment
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.NoAction); // Eliminar comentarios en cascada cuando se elimina un post


            // Configuración de la relación de Post con Like
            modelBuilder.Entity<Like>()
                .HasOne(l => l.Post)
                .WithMany(p => p.Likes)
                .HasForeignKey(l => l.PostId)
                .OnDelete(DeleteBehavior.Cascade); // Eliminar likes en cascada cuando se elimina un post

            modelBuilder.Entity<Like>()
            .HasOne(l => l.User)
            .WithMany()
            .HasForeignKey(l => l.UserId)
            .OnDelete(DeleteBehavior.NoAction);


            // Configuración de la relación de User con UserFollowerk
            modelBuilder.Entity<UserFollower>()
                .HasKey(uf => new { uf.FollowerId, uf.FollowingId });

            modelBuilder.Entity<UserFollower>()
                .HasOne(uf => uf.Follower)
                .WithMany(u => u.Following)
                .HasForeignKey(uf => uf.FollowerId)
                .OnDelete(DeleteBehavior.NoAction); // No eliminar seguidor si hay relaciones de seguimiento

            modelBuilder.Entity<UserFollower>()
            .HasOne(uf => uf.Following)
            .WithMany(u => u.Followers)
            .HasForeignKey(uf => uf.FollowingId)
            .OnDelete(DeleteBehavior.NoAction);


        }

    }
}
