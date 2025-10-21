using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using UserDataappCore.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Absolute path to the database file
var dbPath = Path.Combine(AppContext.BaseDirectory, "monkeys.db");

// Database (SQLite) with absolute path
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=Users.db"));

// Add controllers
builder.Services.AddControllers()
    .AddNewtonsoftJson(); // for array/JSON handling

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Monkey Design API",
        Version = "v1",
        Description = "API for designing and storing monkeys"
    });
});

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Monkey Design API v1");
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
