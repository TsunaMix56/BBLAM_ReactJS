# BBLAM React.JS - Docker & Kubernetes Setup

## 🐳 Docker

### Build Docker Image
```powershell
docker build -t bblam-reactjs:latest .
```

### Run with Docker
```powershell
docker run -d -p 3000:80 --name bblam-reactjs bblam-reactjs:latest
```

### Run with Docker Compose
```powershell
docker-compose up -d
```

### Stop Container
```powershell
docker-compose down
```

### View Logs
```powershell
docker logs -f bblam-reactjs
```

### Access Application
- URL: http://localhost:3000

---

## ☸️ Kubernetes

### Prerequisites
- Kubernetes cluster running
- kubectl configured
- Docker image built and available

### Deploy to Kubernetes

#### 1. Apply ConfigMap
```powershell
kubectl apply -f kubernetes/configmap.yaml
```

#### 2. Deploy Application
```powershell
kubectl apply -f kubernetes/deployment.yaml
```

#### 3. (Optional) Apply Ingress
```powershell
kubectl apply -f kubernetes/ingress.yaml
```

### Check Deployment Status
```powershell
# Check pods
kubectl get pods -l app=bblam-reactjs

# Check service
kubectl get svc bblam-reactjs-service

# Check deployment
kubectl get deployment bblam-reactjs
```

### View Logs
```powershell
kubectl logs -f deployment/bblam-reactjs
```

### Scale Deployment
```powershell
# Scale to 3 replicas
kubectl scale deployment bblam-reactjs --replicas=3
```

### Access Application

#### Via NodePort
- URL: http://<NODE_IP>:30080

#### Via Ingress (if configured)
- Add to hosts file: `127.0.0.1 bblam-reactjs.local`
- URL: http://bblam-reactjs.local

### Delete Deployment
```powershell
kubectl delete -f kubernetes/deployment.yaml
kubectl delete -f kubernetes/configmap.yaml
kubectl delete -f kubernetes/ingress.yaml
```

---

## 📦 Files Created

### Docker
- `Dockerfile` - Multi-stage build (Node.js → Nginx)
- `docker-compose.yml` - Docker Compose configuration
- `.dockerignore` - Files to exclude from Docker build
- `nginx.conf` - Nginx server configuration with API proxy

### Kubernetes
- `kubernetes/deployment.yaml` - Deployment & Service
- `kubernetes/configmap.yaml` - Configuration
- `kubernetes/ingress.yaml` - Ingress routing

---

## 🔧 Configuration

### API Backend URL
แก้ไขใน:
- **Docker**: `nginx.conf` (line 15)
- **Kubernetes**: `kubernetes/configmap.yaml`

### Port Configuration
- **Docker**: `docker-compose.yml` (ports: 3000:80)
- **Kubernetes**: `kubernetes/deployment.yaml` (nodePort: 30080)

---

## 🚀 Quick Start

### Local Development
```powershell
npm run dev
```

### Docker (Production)
```powershell
docker-compose up -d
# Access: http://localhost:3000
```

### Kubernetes (Production)
```powershell
kubectl apply -f kubernetes/
# Access: http://<NODE_IP>:30080
```

---

## 📝 Notes

- Image size: ~50MB (multi-stage build)
- Nginx serves static files
- API proxy to http://172.23.240.1:8000
- Auto-restart enabled
- Health checks configured
- Resource limits set (256Mi RAM, 200m CPU)
