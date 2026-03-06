#!/bin/sh

vault server -config=/opt/vault/vault.hcl &
VAULT_PID=$!

until curl -k --silent http://localhost:8200/v1/sys/health | grep '"initialized":false' > /dev/null; do
    echo "Waiting for Vault server to be ready..."
    sleep 2
done

vault operator init > init.txt

vault operator unseal $(grep 'Unseal Key 1:' init.txt | awk '{print $4}')
vault operator unseal $(grep 'Unseal Key 2:' init.txt | awk '{print $4}')
vault operator unseal $(grep 'Unseal Key 3:' init.txt | awk '{print $4}')


vault login $(grep 'Initial Root Token:' init.txt | awk '{print $4}')

vault policy write vault-policy /opt/vault/vault-policy.hcl
vault secrets enable -path=Camagru kv
vault token create -policy=vault-policy -orphan -id=$VAULT_TOKEN_ID

vault kv put Camagru/email_pass email-pass="$EMAIL_PASSWORD"
vault kv put Camagru/access_token_cookie access-token-cookie="$ACCESS_TOKEN_COOKIE"
vault kv put Camagru/refresh_token_cookie refresh-token-cookie="$REFRESH_TOKEN_COOKIE"
vault kv put Camagru/server_addr server_addr="$SERVER_ADDR"

wait $VAULT_PID