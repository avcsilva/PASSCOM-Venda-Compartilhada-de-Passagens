# Use uma imagem base do Alpine Linux
FROM alpine:3.14

# Instale as dependências necessárias
RUN apk add --no-cache bash curl

# Baixe e instale o etcd
ENV ETCD_VERSION=v3.5.0
RUN curl -L https://github.com/etcd-io/etcd/releases/download/${ETCD_VERSION}/etcd-${ETCD_VERSION}-linux-amd64.tar.gz -o etcd-${ETCD_VERSION}-linux-amd64.tar.gz \
    && tar xzvf etcd-${ETCD_VERSION}-linux-amd64.tar.gz \
    && mv etcd-${ETCD_VERSION}-linux-amd64/etcd* /usr/local/bin/ \
    && rm -rf etcd-${ETCD_VERSION}-linux-amd64.tar.gz etcd-${ETCD_VERSION}-linux-amd64

# Crie um diretório para os dados do etcd
RUN mkdir -p /var/lib/etcd

# Copie o script de inicialização
COPY start-etcd.sh /usr/local/bin/start-etcd.sh
RUN chmod +x /usr/local/bin/start-etcd.sh

# Exponha as portas necessárias
EXPOSE 2379 2380

# Comando para iniciar o etcd
CMD ["/usr/local/bin/start-etcd.sh"]