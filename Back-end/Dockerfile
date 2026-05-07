# Pega uma imagem "pesada" da Microsoft que contém todas as ferramentas para compilar código
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 1. Copia apenas o arquivo de "receita" (.csproj) primeiro e baixa as dependências
COPY CadeODano.csproj ./
RUN dotnet restore CadeODano.csproj

# 2. Copia todo o resto do seu código (Controllers, Models, Services...)
COPY . .

# 3. Compila o projeto no modo Release (otimizado para produção) e guarda na pasta /app/publish
RUN dotnet publish CadeODano.csproj -c Release -o /app/publish

# ETAPA 2: O CAMINHÃO DE ENTREGA (Runtime)
# Pega uma imagem "leve" da Microsoft que SÓ sabe rodar projetos prontos (não sabe compilar)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Avisa que a aplicação vai rodar na porta 8080 (Padrão do .NET 8 no Docker)
EXPOSE 8080

# Pega apenas a pasta /app/publish (o código já compilado) da "Fábrica" e joga no "Caminhão"
COPY --from=build /app/publish .

# O comando que o contêiner vai executar quando for ligado
ENTRYPOINT ["dotnet", "CadeODano.dll"]