using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class EntidadeParcelas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EhParcelado",
                table: "Contas");

            migrationBuilder.DropColumn(
                name: "NumeroParcela",
                table: "Contas");

            migrationBuilder.DropColumn(
                name: "TotalParcelas",
                table: "Contas");

            migrationBuilder.CreateTable(
                name: "Parcelas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContaId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NumeroParcela = table.Column<int>(type: "int", nullable: false),
                    TotalParcelas = table.Column<int>(type: "int", nullable: false),
                    ValorParcela = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DataVencimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Observacao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SysIsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    SysDeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parcelas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Parcelas_Contas_ContaId",
                        column: x => x.ContaId,
                        principalTable: "Contas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Parcelas_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Parcelas_ContaId",
                table: "Parcelas",
                column: "ContaId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcelas_UserId",
                table: "Parcelas",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parcelas");

            migrationBuilder.AddColumn<bool>(
                name: "EhParcelado",
                table: "Contas",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "NumeroParcela",
                table: "Contas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalParcelas",
                table: "Contas",
                type: "int",
                nullable: true);
        }
    }
}
