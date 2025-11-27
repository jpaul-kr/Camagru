ui = true

listener "tcp" {
  address       = "0.0.0.0:8200"
  #tls_cert_file = "/opt/vault/tls/tls.crt"
  #tls_key_file  = "/opt/vault/tls/tls.key"
  tls_disable = 1
  # For development only - remove in production
  #tls_disable_client_certs = false
}

storage "file" {
  path = "/vault/file"
}

api_addr = "http://127.0.0.1:8200"
# cluster_addr = "https://127.0.0.1:8201"  #Por ahora no tiene cluster_addr
disable_mlock = true

# Telemetry for monitoring (optional)
telemetry {
  prometheus_retention_time = "30s"
  disable_hostname = true
}