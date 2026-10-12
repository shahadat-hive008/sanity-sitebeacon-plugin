# Sanity Sitebeacon

pnpm workspace for **Sitebeacon Analysis**, a Sanity Studio plugin that shows
website performance, accessibility, SEO and carbon data inside Studio.

## Repository layout

```
sanity-plugin-sitebeacon/   the publishable plugin
sitebeacon-dev-studio/      local Studio used to develop and preview the plugin
```

| Package | Purpose |
| :--- | :--- |
| `sanity-plugin-sitebeacon` | The plugin itself. Registers a Studio tool named `sitebeacon-analysis`. Runs against local mock data today; the real Sitebeacon API is not wired up yet. |
| `sitebeacon-dev-studio` | A private Sanity Studio that loads the plugin from the workspace, so the dashboard can be developed without publishing. |

See [sanity-plugin-sitebeacon/README.md](sanity-plugin-sitebeacon/README.md) for
the plugin's architecture, data contract and status. That document is the
authoritative one; this file only covers the workspace.

## Prerequisites

- **Node.js** `>=20.19 <22 || >=22.12` (declared in the root `package.json`)
- **pnpm** — the repository is a pnpm workspace; npm and yarn will not resolve
  the `workspace:*` dependency between the two packages

## Getting started

```sh
pnpm install
```

Then create `sitebeacon-dev-studio/.env` from the example:

```sh
cp sitebeacon-dev-studio/.env.example sitebeacon-dev-studio/.env
```

| Variable | Required | Purpose |
| :--- | :--- | :--- |
| `SANITY_STUDIO_PROJECT_ID` | yes | Sanity project the dev Studio is attached to |
| `SANITY_STUDIO_DATASET` | yes | Dataset the dev Studio reads |
| `SANITY_AUTH_TOKEN` | no | Only needed for deployments or private datasets |

The Studio fails to start with a clear error if either required variable is
missing (`sitebeacon-dev-studio/env.ts`).

### Running it

Use **two terminals**:

```sh
# terminal 1 - rebuilds the plugin's dist on every change under src/
pnpm dev:plugin

# terminal 2 - runs the dev Studio
pnpm dev
```

Both are needed. The Studio resolves the plugin through its `default` export
condition (`dist/index.js`), **not** `source` (`src/index.ts`), so edits under the
plugin's `src/` are invisible until `dist` is rebuilt. Without `dev:plugin`
running, changing a component appears to do nothing. This is the single most
common source of confusion in this repository.

## Scripts

Run from the repository root:

| Script | Does |
| :--- | :--- |
| `pnpm dev` | Sanity dev server for `sitebeacon-dev-studio` |
| `pnpm dev:plugin` | `pkg-utils watch` — rebuilds the plugin on change |
| `pnpm build` | Builds the plugin package (`plugin-kit verify-package` + `pkg-utils build`) |
| `pnpm build:studio` | Builds the dev Studio (`sanity build`) |
| `pnpm typecheck` | `tsc --noEmit` across both packages (`--no-bail`, so all errors report) |
| `pnpm lint` | `oxlint` in the plugin |
| `pnpm format` | `oxfmt` in the plugin |
| `pnpm verify` | `plugin-kit verify-package` — checks exports and package metadata |

Note the tooling split: the **plugin** uses `oxlint` + `oxfmt`, while the **dev
Studio** uses ESLint + Prettier. Both are intentional; the plugin follows
`@sanity/plugin-kit` defaults.

## Publishing

Only `sanity-plugin-sitebeacon` is published. It is versioned independently and
`sitebeacon-dev-studio` is `private: true`.

```sh
pnpm build                 # verify-package + pkg-utils build --strict --check
cd sanity-plugin-sitebeacon && npm publish
```

`prepublishOnly` runs the build, and `publishConfig` flattens the exports to
`./dist/index.js`.

## Status

The plugin runs entirely on mock data. Nothing in it calls the real Sitebeacon
API yet, and the dashboard is not complete — the detail view, lab and field
metrics (FCP/INP/CLS) and the resource breakdown are still to come. Pagination is
not implemented and is not planned: the endpoint returns every URL in a single
response, so it could only ever be a client-side view concern. The plugin README's
**Status** and **Data Contract** sections list exactly what is verified and what is
outstanding.

There is also **no test runner** in the workspace. `typecheck`, `lint` and
`build` pass; automated tests do not exist.

## References

These repositories are sources of ideas, not code to copy. Compatibility,
licensing and relevance must be checked before reusing anything from them.

- [sanity-lighthouse-plugin](https://github.com/Halo-Lab/sanity-lighthouse-plugin)
- [Developing Sanity plugins](https://www.sanity.io/docs/studio/developing-plugins)
- [Sanity custom Studio tools](https://www.sanity.io/docs/studio/custom-studio-tool)

## License

MIT
