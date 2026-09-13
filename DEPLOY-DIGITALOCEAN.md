# Deploying to DigitalOcean

Two paths. **App Platform** is the one to use unless you have a reason not to —
it provisions and renews SSL for you, which is most of the work in the Droplet
path.

| | App Platform | Droplet |
|---|---|---|
| Cost | ~$5–12/mo | $6–12/mo |
| SSL | Automatic, auto-renewing | You install and renew Certbot |
| Deploys | Push to `main` | You script it |
| Setup | ~20 minutes | ~90 minutes |
| Control | Limited | Total |

---

## Before either path

### 1. Push to GitHub

```bash
cd acr-next
git init && git add . && git commit -m "Initial site"
git remote add origin git@github.com:YOURNAME/affordable-car-rentals.git
git push -u origin main
```

`.gitignore` already excludes `.env*`. **Check that before you push** — a
Resend key or a Sanity write token in a public repo gets scraped within hours.

### 2. Have these ready

| Variable | Where it comes from |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `RESEND_API_KEY` | resend.com → API Keys |
| `CONTACT_TO_EMAIL` | `info@affordablecarrentals.com.au` |
| `CONTACT_FROM_EMAIL` | `website@affordablecarrentals.com.au` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.affordablecarrentals.com.au` |

### 3. Decide about the existing WordPress install

The domain currently points at WordPress running the Avada real estate demo.
Pointing DNS at the new site replaces it. Before you cut over, either take that
install down or move it to a subdomain — two sites answering for one brand is a
mess you'll be untangling later.

Also: while you're testing, set `SITE_LIVE=false` in the environment. That
flips `robots.ts` to disallow everything, so a half-finished site can't get
indexed under the client's brand. **Remove it on launch day.**

---

## Path A — App Platform (recommended)

### 1. Create the app

DigitalOcean → **Apps** → **Create App** → GitHub → pick the repo, branch
`main`, autodeploy on.

It will detect Next.js. Confirm:

- **Build command:** `npm run build`
- **Run command:** `npm start`
- **HTTP port:** `3000`
- **Instance:** Basic. The 512MB tier will build this, but it's tight — if the
  build gets killed, that's why. 1GB is the safe choice and worth the few
  dollars.

### 2. Environment variables

App → Settings → your component → **Environment Variables**.

Mark `RESEND_API_KEY` and any Sanity token as **encrypted**. The
`NEXT_PUBLIC_*` ones are baked into the client bundle at build time and are
public by definition — never put a secret behind that prefix.

`NEXT_PUBLIC_SITE_URL` must be set **at build time**, because
`sitemap.ts` and `metadataBase` read it during the build. If it's missing your
sitemap will be full of `localhost` URLs.

### 3. Custom domain and SSL

App → Settings → **Domains** → Add Domain → `www.affordablecarrentals.com.au`.

DigitalOcean gives you a CNAME target. At your registrar:

```
CNAME   www   your-app-xxxxx.ondigitalocean.app.
```

For the apex, add `affordablecarrentals.com.au` as a second domain set to
**redirect** to `www`. If your registrar doesn't support ALIAS/ANAME records at
the apex, move the domain's nameservers to DigitalOcean and let it manage DNS —
then apex records work natively.

**SSL is automatic.** DigitalOcean provisions a Let's Encrypt certificate once
DNS resolves and renews it indefinitely. Nothing to install, nothing to cron.
It usually takes 10–30 minutes after the DNS change propagates. If the
certificate doesn't appear, DNS hasn't propagated yet — check with
`dig www.affordablecarrentals.com.au` before touching anything else.

The `Strict-Transport-Security` header in `next.config.ts` forces HTTPS once
the certificate is live. **Don't deploy that header until SSL works**, or
browsers that visit in the meantime will cache the HTTPS-only rule and refuse
to load the site over HTTP while you're still debugging.

### 4. Deploy

Push to `main`. Watch the build log. First build takes 3–5 minutes.

---

## Path B — Droplet with Nginx

More work, more control, cheaper at scale. Use this if you want several sites
on one box or need something App Platform won't run.

### 1. Create and secure the Droplet

Ubuntu 24.04 LTS, Basic, 1GB minimum ($6/mo — 512MB will not build Next
reliably). Add your SSH key during creation.

```bash
ssh root@YOUR_IP

adduser deploy && usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable

# Disable password login
sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh
```

### 2. Install the runtime

```bash
su - deploy
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo npm install -g pm2
```

### 3. Deploy the app

```bash
cd ~ && git clone https://github.com/YOURNAME/affordable-car-rentals.git app
cd app
nano .env.production        # paste the variables from the table above
npm ci
npm run build
```

`next.config.ts` sets `output: "standalone"`, so the build produces a
self-contained server in `.next/standalone` with only the packages it actually
needs. Run that rather than the full tree — it starts faster and uses less
memory, which matters on a 1GB box.

```bash
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

pm2 start .next/standalone/server.js --name acr --update-env
pm2 save
pm2 startup          # run the command it prints
```

### 4. Nginx

```bash
sudo nano /etc/nginx/sites-available/acr
```

```nginx
server {
    listen 80;
    server_name affordablecarrentals.com.au www.affordablecarrentals.com.au;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Next's build output is content-hashed, so it can be cached forever.
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

`X-Forwarded-For` matters here: the form rate limiter reads it. Without it
every submission looks like it came from `127.0.0.1` and five enquiries a
minute from anyone would lock out everyone.

```bash
sudo ln -s /etc/nginx/sites-available/acr /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

### 5. DNS

At your registrar:

```
A       @     YOUR_DROPLET_IP
A       www   YOUR_DROPLET_IP
```

Wait for `dig www.affordablecarrentals.com.au` to return your IP before the
next step. Certbot's validation fails if DNS hasn't propagated, and failed
attempts count against Let's Encrypt's rate limit.

### 6. SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d affordablecarrentals.com.au -d www.affordablecarrentals.com.au
```

Choose redirect HTTP → HTTPS when asked. Certbot rewrites the Nginx config and
installs a renewal timer. Verify it:

```bash
sudo certbot renew --dry-run
systemctl list-timers | grep certbot
```

Certificates last 90 days. **Confirm that timer exists.** A site that silently
goes insecure at the three-month mark is the most common way this path fails.

### 7. Redeploying

```bash
cd ~/app && git pull && npm ci && npm run build
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
pm2 restart acr
```

Worth putting in a `deploy.sh` on day one. You'll run it more than you expect.

---

## After deploying, either path

### Verify SSL properly

```bash
curl -sI https://www.affordablecarrentals.com.au | head -20
curl -sI http://affordablecarrentals.com.au | grep -i location   # should 301 to https
```

Then run it through ssllabs.com/ssltest. Aim for an A.

### Test the forms for real

Not in dev — on production, with the real Resend key.

1. Submit the contact form. Does it arrive at `info@`?
2. Submit from a **vehicle page**. Does the subject name that car?
3. Submit the insurance form. Does the claim number come through?
4. Hit reply on one. Does it go to the enquirer, not to the website?
5. Check the spam folder. If it landed there, DKIM or SPF isn't verified in
   Resend.

A form that looks like it works and silently drops enquiries is worse than no
form, because nobody finds out for weeks.

### Launch checklist

- [ ] `SITE_LIVE` removed, so `robots.txt` allows crawling
- [ ] `/sitemap.xml` shows real URLs, not `localhost`
- [ ] All 16 vehicles in Sanity with photos
- [ ] Sue can log into the Studio and change a price
- [ ] Every form tested end to end, arriving at `info@`
- [ ] `tel:` link tested on a real phone — it fails silently on desktop
- [ ] Sticky call bar visible on mobile
- [ ] Privacy policy written (it's a placeholder)
- [ ] Rental terms legally reviewed (it's a draft)
- [ ] Old WordPress install taken down or moved off the domain
- [ ] Google Search Console verified, sitemap submitted
- [ ] Google Business Profile updated with the new URL
- [ ] Tested on a mid-range Android on 4G, not just desktop Chrome

### Monitoring

Add an uptime check — DigitalOcean's is free under Monitoring, or use
UptimeRobot. Point it at `/` and alert on anything over 30 seconds down.

On the Droplet path, also watch memory:

```bash
pm2 monit
```

Next's ISR keeps rendered pages in memory. On a 1GB box with 38 routes that's
comfortable, but if you add a few hundred vehicle pages, watch it before it
starts swapping.
