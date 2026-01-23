# Knowledge Map (Claude Reference)

> Use @ references to load knowledge files. All paths are relative to .claude/knowledge/

## Architecture

@architecture/documentation-framework.md - Nextra 4 site structure, App Router, content organization

## API

@api/individual-verifications-endpoints.md - Verified API endpoints for sybil resistance, Snapshot strategies

## Config

@config/theme-configuration.md - app/layout.tsx setup, branding, analytics

## Conventions

@conventions/package-manager.md - Must use pnpm, not npm
@conventions/mdx-components.md - Standard Nextra components (Cards, Callout)

## Dependencies

@dependencies/project-dependencies.md - Core packages and versions

## Gotchas

@gotchas/nextra-version-outdated.md - Nextra 4 migration complete, deployment notes
@gotchas/individual-verifications-validation.md - Current state, removed features, contract addresses
@gotchas/fork-vs-origin-prs.md - Must push to fork remote for external PRs

## Workflows

@workflows/pr-workflow.md - Always use PRs, never push directly to main
@workflows/redirect-management.md - Legacy URL redirects in next.config.mjs
