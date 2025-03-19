using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceApp.Migrations
{
    public partial class AddUserIdToTransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Adiciona a coluna UserId à tabela Transactions
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Transactions",
                type: "char(36)", // Ou "uuid" dependendo da sua configuração de banco
                nullable: false,
                defaultValue: Guid.Empty);  // Defina como Guid.Empty ou qualquer valor padrão, dependendo da sua lógica
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove a coluna UserId caso a migração seja revertida
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Transactions");
        }
    }
}
