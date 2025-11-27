FROM nginx:1.24.0

USER root

WORKDIR /opt/

RUN apt-get update

RUN apt-get update && apt-get install -y gnupg curl wget
RUN wget https://apt.releases.hashicorp.com/gpg -O /tmp/hashicorp.gpg && \
    gpg --dearmor < /tmp/hashicorp.gpg > /usr/share/keyrings/hashicorp-archive-keyring.gpg
RUN gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint
RUN CODENAME=$(grep VERSION_CODENAME /etc/os-release | cut -d= -f2) && \
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $CODENAME main" > /etc/apt/sources.list.d/hashicorp.list
RUN apt update -y && apt install vault -y

COPY ./conf/vault.hcl /opt/vault/vault.hcl
COPY ./start.sh /opt/vault/start.sh
RUN chmod +x /opt/vault/start.sh

ENV VAULT_API_ADDR=http://127.0.0.1:8200
ENV VAULT_ADDR=http://127.0.0.1:8200



EXPOSE  8200

ENTRYPOINT ["./vault/start.sh"]