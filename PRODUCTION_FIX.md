# 🚨 Production Backend Connection Fix

## Current Error: "Cannot connect to backend. Please check if the server is running on the correct URL."

### ✅ **Immediate Actions Required:**

#### 1. **Get Railway Backend URL**
1. Go to https://railway.app
2. Navigate to your DevCatalyst backend project
3. Copy the production URL (format: `https://your-app-production.up.railway.app`)

#### 2. **Update Vercel Environment Variables**
1. Go to https://vercel.com/dashboard
2. Select your DevCatalyst project
3. Go to Settings → Environment Variables
4. Add/Update these variables:

```
NEXT_PUBLIC_API_URL = https://your-railway-url.up.railway.app/api
```

**⚠️ Important**: The URL should end with `/api` (not just the domain)

#### 3. **Redeploy Frontend**
After updating environment variables:
1. Go to Vercel Deployments tab
2. Click "Redeploy" on the latest deployment
3. Wait for deployment to complete

#### 4. **Verify Backend is Running**
Test your Railway backend directly:
```bash
curl https://your-railway-url.up.railway.app/api/test/
```

Should return: `{"status": "Backend is running!"}`

#### 5. **Check Django CORS Settings**
Ensure your Railway backend has the correct CORS configuration:

**Environment Variables in Railway:**
```
CORS_ALLOWED_ORIGINS = https://your-vercel-app.vercel.app
DEBUG = False
ALLOWED_HOSTS = your-railway-app.up.railway.app
```

### 🔍 **Common Issues & Solutions:**

| Issue | Solution |
|-------|----------|
| Railway app sleeping | Upgrade to paid plan or use wake-up script |
| Wrong API URL format | Ensure URL ends with `/api` |
| CORS errors | Add frontend domain to CORS_ALLOWED_ORIGINS |
| 404 Not Found | Check Django URL routing is correct |
| 500 Server Error | Check Railway logs for Django errors |

### 📝 **Quick Debug Steps:**

1. **Test API directly**: Visit `https://your-railway-url.up.railway.app/api/test/`
2. **Check browser console**: Look for CORS or network errors
3. **Verify environment variables**: Check Vercel settings
4. **Check Railway logs**: Look for deployment errors

### 🆘 **If Still Not Working:**

1. **Check Railway Logs**: Look for startup errors
2. **Verify Database**: Ensure migrations ran successfully
3. **Test Admin Login**: Try `https://your-railway-url.up.railway.app/api/admin/login/`
4. **CORS Debug**: Check browser network tab for CORS errors

### 📞 **Quick Fix Commands:**

```bash
# Test backend directly
curl -X GET https://your-railway-url.up.railway.app/api/test/

# Test admin login
curl -X POST https://your-railway-url.up.railway.app/api/admin/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"devcatalyst2025"}'
```

Expected responses:
- Test endpoint: `{"status": "Backend is running!"}`
- Admin login: `{"success": true, "token": "...", "user": {...}}`