using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class RecorrenciaAtt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Recorrencia",
                table: "Receitas");

            migrationBuilder.AddColumn<string>(
                name: "Competencia",
                table: "Receitas",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RecorrenciaRegraId",
                table: "Receitas",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ReceitaRecorrencias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TipoRecorrencia = table.Column<int>(type: "int", nullable: false),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataFim = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DiaDoMes = table.Column<int>(type: "int", nullable: true),
                    DiaDaSemana = table.Column<int>(type: "int", nullable: true),
                    Titulo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Valor = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Categoria = table.Column<int>(type: "int", nullable: false),
                    NumeroDocumento = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContaBancariaId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UltimaGeracao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProximoVencimento = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Ativa = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SysIsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    SysDeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceitaRecorrencias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReceitaRecorrencias_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Receitas_RecorrenciaRegraId",
                table: "Receitas",
                column: "RecorrenciaRegraId");

            migrationBuilder.CreateIndex(
                name: "IX_Receitas_UserId_RecorrenciaRegraId_Competencia",
                table: "Receitas",
                columns: new[] { "UserId", "RecorrenciaRegraId", "Competencia" });

            migrationBuilder.CreateIndex(
                name: "IX_ReceitaRecorrencias_UserId_Ativa",
                table: "ReceitaRecorrencias",
                columns: new[] { "UserId", "Ativa" });

            migrationBuilder.CreateIndex(
                name: "IX_ReceitaRecorrencias_UserId_ProximoVencimento",
                table: "ReceitaRecorrencias",
                columns: new[] { "UserId", "ProximoVencimento" });

            migrationBuilder.AddForeignKey(
                name: "FK_Receitas_ReceitaRecorrencias_RecorrenciaRegraId",
                table: "Receitas",
                column: "RecorrenciaRegraId",
                principalTable: "ReceitaRecorrencias",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receitas_ReceitaRecorrencias_RecorrenciaRegraId",
                table: "Receitas");

            migrationBuilder.DropTable(
                name: "ReceitaRecorrencias");

            migrationBuilder.DropIndex(
                name: "IX_Receitas_RecorrenciaRegraId",
                table: "Receitas");

            migrationBuilder.DropIndex(
                name: "IX_Receitas_UserId_RecorrenciaRegraId_Competencia",
                table: "Receitas");

            migrationBuilder.DropColumn(
                name: "Competencia",
                table: "Receitas");

            migrationBuilder.DropColumn(
                name: "RecorrenciaRegraId",
                table: "Receitas");

            migrationBuilder.AddColumn<int>(
                name: "Recorrencia",
                table: "Receitas",
                type: "int",
                nullable: true);
        }
    }
}
