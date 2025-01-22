# DevOps DSM

## Tips

Expose WSL ports on network:

```pwsh
# Elevated PowerShell
port = 8000
netsh interface portproxy set v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=127.0.0.1
```