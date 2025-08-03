using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUserRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Receitas",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Contas",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Receitas_UserId",
                table: "Receitas",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Contas_UserId",
                table: "Contas",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contas_Users_UserId",
                table: "Contas",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Receitas_Users_UserId",
                table: "Receitas",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contas_Users_UserId",
                table: "Contas");

            migrationBuilder.DropForeignKey(
                name: "FK_Receitas_Users_UserId",
                table: "Receitas");

            migrationBuilder.DropIndex(
                name: "IX_Receitas_UserId",
                table: "Receitas");

            migrationBuilder.DropIndex(
                name: "IX_Contas_UserId",
                table: "Contas");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Receitas");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Contas");
        }
    }
}
