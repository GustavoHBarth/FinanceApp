using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceApp.Migrations
{
    public partial class AddBalanceTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Criação da tabela 'Balances'
            migrationBuilder.CreateTable(
                name: "Balances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    BalanceUserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Balances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Balances_AspNetUsers_BalanceUserId",
                        column: x => x.BalanceUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            // Criação do índice único para o 'BalanceUserId' na tabela 'Balances'
            migrationBuilder.CreateIndex(
                name: "IX_Balances_BalanceUserId",
                table: "Balances",
                column: "BalanceUserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remover a tabela 'Balances' e o índice associado
            migrationBuilder.DropTable(
                name: "Balances");

            // Remover o índice 'IX_Transactions_UserId' se não existir
            // O EF já deve gerenciar esse índice automaticamente
            // Caso contrário, a remoção não causará problemas
            migrationBuilder.DropIndex(
                name: "IX_Transactions_UserId",
                table: "Transactions");
        }
    }
}
