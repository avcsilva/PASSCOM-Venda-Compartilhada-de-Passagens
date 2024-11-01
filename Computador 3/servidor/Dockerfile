# Use uma imagem base do Golang
FROM golang:1.17-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos go.mod e go.sum e baixe as dependências
COPY go.mod go.sum ./
RUN go mod download

# Copie o código-fonte do servidor
COPY . .

# Compile o código do servidor
RUN go build -o servidor .

# Exponha a porta do servidor
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["./servidor"]