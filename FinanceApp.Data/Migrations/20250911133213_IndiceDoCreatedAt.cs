using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class IndiceDoCreatedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Receitas_UserId",
                table: "Receitas");

            migrationBuilder.CreateIndex(
                name: "IX_Receitas_UserId_CreatedAt",
                table: "Receitas",
                columns: new[] { "UserId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Receitas_UserId_Data",
                table: "Receitas",
                columns: new[] { "UserId", "Data" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Receitas_UserId_CreatedAt",
                table: "Receitas");

            migrationBuilder.DropIndex(
                name: "IX_Receitas_UserId_Data",
                table: "Receitas");

            migrationBuilder.CreateIndex(
                name: "IX_Receitas_UserId",
                table: "Receitas",
                column: "UserId");
        }
    }
}
