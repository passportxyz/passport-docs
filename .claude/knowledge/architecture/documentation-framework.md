# Documentation Framework

## Overview

This is the Human Passport documentation site built with Nextra 2.13.2 (nextra-theme-docs). Uses Next.js 13.4.19 with Pages Router.

## Key Files

- `theme.config.tsx` - Theme configuration with logo, navigation links, SEO settings, and Google Tag Manager integration
- `next.config.js` - Nextra wrapper with extensive redirect mappings (60+ redirects for legacy URL support)
- `pages/` directory contains all MDX content
- Each folder has a `_meta.json` for navigation ordering

## Content Structure

The docs are organized into main sections:

- `overview/` - Why Human Passport, key terms, changelog
- `building-with-passport/` - Main developer content
  - `stamps/` - Passport API, smart contracts, major concepts
  - `embed/` - Passport Embed component
  - `models/` - ML-based sybil detection
  - `individual-verifications/` - Privacy-preserving KYC (formerly Zeronym)
- `community/` - Getting involved, style guide

Navigation order is controlled by `_meta.json` files in each directory. External links (Passport App, Developer Portal, API Playground, Blog) are defined in root `_meta.json`.

## Related Files

- theme.config.tsx
- next.config.js
- pages/_meta.json
- pages/building-with-passport/_meta.json
