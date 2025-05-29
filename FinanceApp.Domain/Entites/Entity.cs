using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace FinanceApp.Domain.Entities
{
    public abstract class Entity
    {
        [Key]
        public Guid Id { get; set; }

        [JsonIgnore]
        public Guid? SysInsertId { get; set; }

        [JsonIgnore]
        public Guid? SysUpdateId { get; set; }

        [JsonIgnore]
        public DateTime? SysInsertDate { get; set; }

        [JsonIgnore]
        public DateTime? SysUpdateDate { get; set; }

        [JsonIgnore]
        public bool SysDeleted { get; set; }
    }
}
