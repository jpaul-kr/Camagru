#!/bin/sh

vault server -config=/opt/vault/vault.hcl &
VAULT_PID=$!

until curl -k --silent http://localhost:8200/v1/sys/health | grep '"initialized":false' > /dev/null; do
    echo "Waiting for Vault server to be ready..."
    sleep 2
done

vault operator init

wait $VAULT_PID