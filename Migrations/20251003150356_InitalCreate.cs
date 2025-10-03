using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserDataappCore.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitalCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MonkeyDesigns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Head = table.Column<string>(type: "TEXT", nullable: false),
                    Body = table.Column<string>(type: "TEXT", nullable: false),
                    Eyes = table.Column<string>(type: "TEXT", nullable: false),
                    Ears = table.Column<string>(type: "TEXT", nullable: false),
                    Arms = table.Column<string>(type: "TEXT", nullable: false),
                    Legs = table.Column<string>(type: "TEXT", nullable: false),
                    Feet = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonkeyDesigns", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MonkeyDesigns");
        }
    }
}
