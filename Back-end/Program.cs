using CadeODano.Interfaces;
using CadeODano.Mappings;
using CadeODano.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

//Services
builder.Services.AddScoped<IStatsCalculatorService, StatsCalculatorService>();
builder.Services.AddScoped<IPlayerDashboardService, PlayerDashboardService>();
builder.Services.AddScoped<IRiotApiService, RiotApiService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMemoryCache();

builder.Services.AddAutoMapper(typeof(RiotProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddHttpClient<IRiotApiService, RiotApiService>(client =>
{
    var riotApiKey = builder.Configuration["RiotApi:Key"];

    client.DefaultRequestHeaders.Add("X-Riot-Token", riotApiKey);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseCors("FrontendPolicy");

app.Run();
