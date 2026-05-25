# AGENTS.md

This repository is safe for coding agents to work in with a small set of rules.

## Repo Model

- Source content lives in `blog/*.md`.
- Generated post pages live in `posts/<slug>/index.html`.
- Shared site chrome lives in `index.html`, `about.html`, `styles.css`, `script.js`, and `template-post.html`.
- `convert-posts.js` is the build step that regenerates posts, `posts-metadata.json`, and `sitemap.xml`.

## Source Of Truth

- For article content changes, edit `blog/*.md` first, then run `npm run build`.
- Do not hand-edit generated files in `posts/` unless the task is explicitly about generated output.
- If you change `template-post.html`, `styles.css`, `script.js`, or `convert-posts.js`, rebuild generated content before finishing.

## Commands

- `npm run build`: regenerate posts, metadata, and sitemap.
- `npm run verify`: validate markdown frontmatter and source/generated consistency.
- `npm run serve`: local preview at `http://localhost:8000`.

## Expected Workflow

1. Make the smallest change in source files.
2. Run `npm run build` if the change affects generated output.
3. Run `npm run verify` before handing work back.
4. Mention whether generated files were updated.

## Guardrails

- Preserve the terminal-first visual language and minimal green accents.
- Keep the project zero-framework and static-hosting friendly.
- Prefer updating markdown sources over editing generated HTML.
- Be careful in a dirty worktree: generated files are often updated in bulk.

## Useful Files

- `CLAUDE.md`: detailed repo guidance.
- `README.md`: human-facing setup and structure.
- `.github/workflows/deploy.yml`: production build/deploy flow.
