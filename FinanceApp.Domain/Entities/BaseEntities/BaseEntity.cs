using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace FinanceApp.Domain.Entities.BaseEntities
{
    public abstract class BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public bool SysIsDeleted { get; private set; }

        public DateTime? SysDeletedAt { get; set; }

        protected BaseEntity()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }

        public void Update()
        {
            UpdatedAt = DateTime.UtcNow;
        }

        public void Delete()
        {
            SysIsDeleted = true;
            SysDeletedAt = DateTime.Now;
        }
    }
}
