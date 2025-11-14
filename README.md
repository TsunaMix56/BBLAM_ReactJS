# BBLAM React App

This is a Vite + React authentication application for BBLAM_ReactJS workspace.

## 🚀 Quick Start

### Development
```powershell
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Production Build
```powershell
npm run build
```

## 🐳 Docker & Kubernetes

See [DOCKER_KUBERNETES.md](./DOCKER_KUBERNETES.md) for deployment instructions.

Full visual HTML guide: open `deployment_guide.html` in a browser for a styled light-blue deployment handbook (Docker + Kubernetes + troubleshooting).

**Quick Docker Start:**
```powershell
docker-compose up -d
# Access: http://localhost:3000
```

**Quick Kubernetes Deploy:**
```powershell
kubectl apply -f kubernetes/
# Access: http://<NODE_IP>:30080
```

## 📁 Project Structure

- `src/components/` - React components (Login, Welcome, CreateAccount)
- `src/services/` - API services (auth, token management)
- `src/config/` - Configuration files
- `kubernetes/` - Kubernetes manifests
- `Dockerfile` - Docker build configuration
- `docker-compose.yml` - Docker Compose setup

## 🔧 Configuration

### API Mode
Edit `src/config/apiConfig.js`:
- `'DIRECT'` - Call API directly
- `'PROXY'` - Use Vite proxy (development)

### Mock Mode
Edit `src/services/mockAPI.js`:
- `true` - Use mock data for testing
- `false` - Use real API

## 🌐 Features

- ✅ Login with username/password/role
- ✅ Create account functionality
- ✅ Token-based authentication with auto-refresh
- ✅ Welcome page with user info
- ✅ Light blue theme UI
- ✅ Docker & Kubernetes ready

