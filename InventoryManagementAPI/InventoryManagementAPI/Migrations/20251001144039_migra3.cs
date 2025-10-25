using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class migra3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WareHouseItems_WareHouses_WareHouseId",
                table: "WareHouseItems");

            migrationBuilder.DropForeignKey(
                name: "FK_WareHouses_Cities_CityId",
                table: "WareHouses");

            migrationBuilder.DropForeignKey(
                name: "FK_WareHouses_Countries_CountryId",
                table: "WareHouses");

            migrationBuilder.RenameColumn(
                name: "CountryId",
                table: "WareHouses",
                newName: "Country_Id");

            migrationBuilder.RenameColumn(
                name: "CityId",
                table: "WareHouses",
                newName: "City_Id");

            migrationBuilder.RenameIndex(
                name: "IX_WareHouses_CountryId",
                table: "WareHouses",
                newName: "IX_WareHouses_Country_Id");

            migrationBuilder.RenameIndex(
                name: "IX_WareHouses_CityId",
                table: "WareHouses",
                newName: "IX_WareHouses_City_Id");

            migrationBuilder.RenameColumn(
                name: "WareHouseId",
                table: "WareHouseItems",
                newName: "WareHouse_Id");

            migrationBuilder.RenameIndex(
                name: "IX_WareHouseItems_WareHouseId",
                table: "WareHouseItems",
                newName: "IX_WareHouseItems_WareHouse_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WareHouseItems_WareHouses_WareHouse_Id",
                table: "WareHouseItems",
                column: "WareHouse_Id",
                principalTable: "WareHouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WareHouses_Cities_City_Id",
                table: "WareHouses",
                column: "City_Id",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WareHouses_Countries_Country_Id",
                table: "WareHouses",
                column: "Country_Id",
                principalTable: "Countries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WareHouseItems_WareHouses_WareHouse_Id",
                table: "WareHouseItems");

            migrationBuilder.DropForeignKey(
                name: "FK_WareHouses_Cities_City_Id",
                table: "WareHouses");

            migrationBuilder.DropForeignKey(
                name: "FK_WareHouses_Countries_Country_Id",
                table: "WareHouses");

            migrationBuilder.RenameColumn(
                name: "Country_Id",
                table: "WareHouses",
                newName: "CountryId");

            migrationBuilder.RenameColumn(
                name: "City_Id",
                table: "WareHouses",
                newName: "CityId");

            migrationBuilder.RenameIndex(
                name: "IX_WareHouses_Country_Id",
                table: "WareHouses",
                newName: "IX_WareHouses_CountryId");

            migrationBuilder.RenameIndex(
                name: "IX_WareHouses_City_Id",
                table: "WareHouses",
                newName: "IX_WareHouses_CityId");

            migrationBuilder.RenameColumn(
                name: "WareHouse_Id",
                table: "WareHouseItems",
                newName: "WareHouseId");

            migrationBuilder.RenameIndex(
                name: "IX_WareHouseItems_WareHouse_Id",
                table: "WareHouseItems",
                newName: "IX_WareHouseItems_WareHouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_WareHouseItems_WareHouses_WareHouseId",
                table: "WareHouseItems",
                column: "WareHouseId",
                principalTable: "WareHouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WareHouses_Cities_CityId",
                table: "WareHouses",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WareHouses_Countries_CountryId",
                table: "WareHouses",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id");
        }
    }
}
