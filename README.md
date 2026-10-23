# Football Forum — UI/UX Preview

A responsive React + Vite interface for the Football Forum product concept.

## Run locally
```bash
npm install
npm run dev
```

Production build:
```bash
npm run build
npm run preview
```

## Included interface screens
- Home feed with topic filters, reactions, saved discussions and composer
- Discover/search for discussions and clubhouses
- Clubhouse detail with public-read/locked-participation state and level-up path
- Matchday Arena with pre-match discussion prompts, poll and match lifecycle
- Platform prediction desk with transparent data-source/settlement messaging
- Member profile, reputation progress and five-level progression ladder
- Notifications centre
- Community guidelines and reporting principles
- Registration design with favourite-club selection and terms agreement
- Responsive desktop/mobile navigation and reduced-motion support

## Design system
- Midnight Navy: `#101827`
- Deep Slate: `#202C40`
- Electric Lime: `#C7F36B`
- Warm White: `#F6F5F0`
- Pure White: `#FFFFFF`

## Important scope boundary
This repository is the **UI/UX phase**. The current discussion examples and counters are illustrative preview data. Form submissions, votes, reactions, replies, registration, notifications, reputation and club membership are not persisted to a backend yet. Fixture information is intentionally not presented as live data. Supabase authentication/database, verified fixtures/results, moderation services, accessibility QA and end-to-end testing are follow-on implementation work.

Before launch, validate the build and test every screen on real mobile and desktop viewport sizes.

## Automated build and deployment

Pushing to `main` runs `npm install`, `npm run build`, and then deploys the Vite `dist/` assets to the existing Cloudflare Worker named `forum` using `wrangler.jsonc`.

Configure these two GitHub Actions repository secrets before the deploy step can succeed:

- `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with permission to edit Workers scripts for the target account.
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID that owns the `forum` Worker.

Add them in **GitHub → DevOlayes/Forum → Settings → Secrets and variables → Actions → New repository secret**. Never commit either value to the repository. Once configured, each push to `main` builds first and deploys that exact checked-out commit; inspect the Actions run and Cloudflare Worker version metadata to confirm the result.
