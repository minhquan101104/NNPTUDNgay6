# Submit Checklist

## 1) Postman screenshots
- [ ] `postman-me.png` (request `/api/v1/auth/me`, status 200)
- [ ] `postman-change-password.png` (request `/api/v1/auth/change-password`, status 200)

Put images into folder:
- `evidence/images/`

## 2) RSA key files
- [ ] `keys/private.key`
- [ ] `keys/public.key`

## 3) Main code changes
- [ ] `routes/auth.js`
- [ ] `utils/authHandler.js`
- [ ] `utils/validator.js`
- [ ] `utils/jwtHandler.js`
- [ ] `package.json`

## 4) Git commands
```bash
git add .
git commit -m "feat(auth): add change-password and migrate JWT to RS256"
git push
```
