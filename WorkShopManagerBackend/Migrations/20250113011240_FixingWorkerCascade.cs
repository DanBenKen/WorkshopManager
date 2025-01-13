using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkshopManager.Migrations
{
    /// <inheritdoc />
    public partial class FixingWorkerCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Workers_WorkerId",
                table: "Jobs");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Workers_WorkerId",
                table: "Jobs",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Workers_WorkerId",
                table: "Jobs");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Workers_WorkerId",
                table: "Jobs",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
