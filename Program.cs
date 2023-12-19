
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using Store.Data;
using Store;
using Store.Data.Service;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlite("name=ConnectionStrings:DefaultConnection"));
builder.Services.AddTransient<IItemsService, ItemsService>();
builder.Services.AddTransient<ICardService, CardService>();
builder.Services.AddControllers();

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll",
            builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.UseCors("AllowAll");

app.Run();
