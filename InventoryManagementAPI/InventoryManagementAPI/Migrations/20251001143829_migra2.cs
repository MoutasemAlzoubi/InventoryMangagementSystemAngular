using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class migra2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_Countries_CountryId",
                table: "Cities");

            migrationBuilder.RenameColumn(
                name: "CountryId",
                table: "Cities",
                newName: "Country_Id");

            migrationBuilder.RenameIndex(
                name: "IX_Cities_CountryId",
                table: "Cities",
                newName: "IX_Cities_Country_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_Countries_Country_Id",
                table: "Cities",
                column: "Country_Id",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_Countries_Country_Id",
                table: "Cities");

            migrationBuilder.RenameColumn(
                name: "Country_Id",
                table: "Cities",
                newName: "CountryId");

            migrationBuilder.RenameIndex(
                name: "IX_Cities_Country_Id",
                table: "Cities",
                newName: "IX_Cities_CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_Countries_CountryId",
                table: "Cities",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
