using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserDataappCore.Api.Migrations
{
    /// <inheritdoc />
    public partial class MonkeyUserRelationshipsAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Arms",
                table: "MonkeyDesigns");

            migrationBuilder.DropColumn(
                name: "Body",
                table: "MonkeyDesigns");

            migrationBuilder.DropColumn(
                name: "Ears",
                table: "MonkeyDesigns");

            migrationBuilder.DropColumn(
                name: "Eyes",
                table: "MonkeyDesigns");

            migrationBuilder.RenameColumn(
                name: "Legs",
                table: "MonkeyDesigns",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Head",
                table: "MonkeyDesigns",
                newName: "Info");

            migrationBuilder.RenameColumn(
                name: "Feet",
                table: "MonkeyDesigns",
                newName: "Continent");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "MonkeyDesigns",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MonkeyDesigns_UserId",
                table: "MonkeyDesigns",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MonkeyDesigns_Users_UserId",
                table: "MonkeyDesigns",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MonkeyDesigns_Users_UserId",
                table: "MonkeyDesigns");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_MonkeyDesigns_UserId",
                table: "MonkeyDesigns");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MonkeyDesigns");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "MonkeyDesigns",
                newName: "Legs");

            migrationBuilder.RenameColumn(
                name: "Info",
                table: "MonkeyDesigns",
                newName: "Head");

            migrationBuilder.RenameColumn(
                name: "Continent",
                table: "MonkeyDesigns",
                newName: "Feet");

            migrationBuilder.AddColumn<string>(
                name: "Arms",
                table: "MonkeyDesigns",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Body",
                table: "MonkeyDesigns",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Ears",
                table: "MonkeyDesigns",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Eyes",
                table: "MonkeyDesigns",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
