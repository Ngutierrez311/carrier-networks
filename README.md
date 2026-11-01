# carrier-networks

Public marketing and invoice-payment site for **Carrier Networks LLC**
(`carrier-networks.com`). Static HTML/CSS/JS — no build step.

Source of truth. Previously served from the Kubernetes cluster out of
`IaC2/containers/skynet/` (a directory name that predates the company rename);
that path is now historical.

## Layout

| Path | What |
|------|------|
| `index.html` | Home |
| `offerings.html` | Services |
| `contacts.html` | Contact |
| `pay.html` | Invoice payment (PayPal + crypto) — see below |
| `css/` `js/` | Bootstrap 3 + jQuery 1.11 + `custom.css` / `custom.js` |
| `images/` `logos/` `fonts/` | Assets |
| `_headers` | Cloudflare Pages security headers |

All asset and link paths are relative, so the site is portable as-is.

## Cloudflare Pages

| Setting | Value |
|---------|-------|
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `/` |
| Production branch | `main` |

Custom domains to add after the first deploy: `carrier-networks.com` and
`www.carrier-networks.com`.

> Note: the cluster's BIND zone is still the unhyphenated spelling
> (`carriernetworks.com`) while the live site serves the hyphenated one. Confirm
> the registrar's nameservers before cutting DNS over to Pages.

## Payments — read before enabling

`pay.html` contains **no credentials and must never contain any.** This is a
static site; anything in this repo is public.

PayPal and NOWPayments credentials for Carrier Networks LLC live server-side in
the payment API. `pay.html` talks to it over four endpoints:

- `GET  /payment/config` — returns the PayPal client ID and whether crypto is on
- `POST /payment/create-order` — opens a PayPal order
- `POST /payment/capture-order` — captures it
- `POST /payment/crypto/create-payment` — issues a crypto address
- `GET  /payment/crypto/check-payment/<id>` — polls its status

### Switching online payment on

One line, at the top of the `<script>` block in `pay.html`:

```javascript
var PAYMENT_API = '';
```

Set it to the payment API origin (for example
`https://api.carrier-networks.com`) and commit. While it is empty the page hides
the payment widgets and shows a "contact us to pay" notice instead, so the page
is safe to deploy before the backend is ready.

The origin you set must also be on the payment API's CORS allowlist
(`PAYMENT_ALLOWED_ORIGINS`), or the browser will block every call.
