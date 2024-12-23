using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkshopManager.Migrations
{
    /// <inheritdoc />
    public partial class UpdatingModelsWithForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkerName",
                table: "Jobs");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_SupplyId",
                table: "Jobs",
                column: "SupplyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Supplies_SupplyId",
                table: "Jobs",
                column: "SupplyId",
                principalTable: "Supplies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Supplies_SupplyId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_SupplyId",
                table: "Jobs");

            migrationBuilder.AddColumn<string>(
                name: "WorkerName",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
