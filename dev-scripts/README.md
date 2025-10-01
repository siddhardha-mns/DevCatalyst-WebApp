# Development Scripts

This folder contains development-time scripts and configurations that are not needed for production deployment.

## Files:

- `package.json` - Root-level package.json for development workflow
- `package-lock.json` - Lock file for development dependencies  
- `start.sh` - Local development startup script

## Usage:

For local development, you can use these scripts to start both frontend and backend simultaneously:

```bash
cd dev-scripts
npm install
npm run dev
```

For production deployment, these files are ignored and only the backend Django application is deployed.