# vault-policy
path "Camagru" {
    capabilities = ["list"]
}

path "Camagru/*" {
    capabilities = ["read", "list"]
}