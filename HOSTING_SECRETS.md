# 🔐 DevCatalyst Hosting Secrets & Security Guide

## 🎯 Critical Secrets to Keep Safe

### 🔑 **Backend Environment Variables**

#### Required for All Platforms:
```bash
SECRET_KEY=generate-a-50-character-random-string-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
```

#### For Database:
```bash
DATABASE_URL=postgresql://username:password@host:port/database
```

#### For CORS (Frontend Connection):
```bash
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### 🌐 **Frontend Environment Variables**

```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
```

---

## 🏆 **My Top Hosting Recommendation: Vercel + Railway**

### Why This Combo?
- ✅ **Free to start** (both have free tiers)
- ✅ **Easy deployment** (GitHub integration)
- ✅ **Automatic scaling**
- ✅ **Great performance**
- ✅ **Perfect for your stack**

---

## 🚀 **Step-by-Step Deployment**

### Phase 1: Backend on Railway

1. **Sign up**: Go to [railway.app](https://railway.app)
2. **Connect GitHub**: Link your DevCatalyst repository
3. **Deploy Backend**:
   - Select "Deploy from GitHub repo"
   - Choose backend folder
   - Railway auto-detects Django

4. **Add Environment Variables**:
   ```bash
   SECRET_KEY=your-generated-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-railway-domain.railway.app
   ```

5. **Add PostgreSQL**:
   - Click "Add Plugin"
   - Select PostgreSQL
   - Railway auto-sets DATABASE_URL

6. **Deploy & Migrate**:
   ```bash
   python manage.py migrate
   python manage.py collectstatic
   ```

### Phase 2: Frontend on Vercel

1. **Sign up**: Go to [vercel.com](https://vercel.com)
2. **Import Project**: 
   - Connect GitHub
   - Select your repository
   - Choose frontend folder
3. **Configure Build**:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables**:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app/api
   ```

5. **Deploy**: Vercel automatically deploys

---

## 💰 **Cost Breakdown**

### Free Tier (Perfect for DevCatalyst):
- **Railway**: $0 (500 hours/month)
- **Vercel**: $0 (100GB bandwidth)
- **Domain**: $12/year (optional)
- **Total**: $12/year

### Pro Tier (For Growth):
- **Railway**: $5/month
- **Vercel**: $20/month  
- **Total**: $25/month

---

## 🔒 **Security Best Practices**

### Must-Do Security Steps:

1. **Generate Strong Secret Key**:
   ```python
   from django.core.management.utils import get_random_secret_key
   print(get_random_secret_key())
   ```

2. **Enable HTTPS Only**:
   - Set `SECURE_SSL_REDIRECT = True`
   - Both Railway and Vercel provide HTTPS

3. **Secure Cookies**:
   - Set `SESSION_COOKIE_SECURE = True`
   - Set `CSRF_COOKIE_SECURE = True`

4. **Update CORS Origins**:
   ```python
   CORS_ALLOWED_ORIGINS = [
       "https://your-actual-domain.com",
       "https://www.your-actual-domain.com"
   ]
   ```

---

## 🎯 **Production Checklist**

### Before Going Live:
- [ ] Change SECRET_KEY to production value
- [ ] Set DEBUG=False
- [ ] Configure real domain in ALLOWED_HOSTS
- [ ] Update CORS_ALLOWED_ORIGINS
- [ ] Test registration functionality
- [ ] Set up database backups
- [ ] Configure monitoring (optional)

### After Deployment:
- [ ] Test website loads correctly
- [ ] Test events page fetches data
- [ ] Test event registration works
- [ ] Check mobile responsiveness
- [ ] Test all navigation links

---

## 🆘 **Common Issues & Solutions**

### Issue: CORS Errors
**Solution**: Add your frontend domain to CORS_ALLOWED_ORIGINS

### Issue: Static Files Not Loading
**Solution**: Run `python manage.py collectstatic` on Railway

### Issue: Database Connection Failed
**Solution**: Check DATABASE_URL is set correctly

### Issue: 500 Server Error
**Solution**: Check logs in Railway dashboard

---

## 📞 **Getting Help**

### Platform Documentation:
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Django Deployment](https://docs.djangoproject.com/en/4.2/howto/deployment/)

### DevCatalyst Support:
- Check deployment logs first
- Test locally before deploying
- Use staging environment for testing