# Ou AI Command Office

Static MVP v1 dashboard for Ou Personal Agent Office.

Live preview: https://damrongsukou.github.io/ou-ai-command-office/

## Purpose

This project turns the Master Blueprint into a first usable dashboard with rooms, agents, mock tasks, prompt templates, and recent outputs.

## MVP v1 Scope

- Static dashboard only
- HTML, CSS, JavaScript only
- No backend
- No real API
- No login
- Local JSON / Markdown mock data only
- No real private, customer, financial, or confidential data

## Folder Structure

- `index.html` - main dashboard
- `styles.css` - executive command office UI
- `app.js` - mock task routing and UI interactions
- `data/` - public-safe mock data
- `prompts/` - reusable agent prompt templates
- `outputs/` - generated output placeholder
- `private_context.example/` - public-safe private context templates
- `private_context/` - local only, ignored by git

## Privacy Rule

Do not commit real private data. The dashboard must not display real `private_context` data. Use placeholders unless Ou explicitly opens private files locally.

## Start

Open `index.html` in a browser.

For GitHub Pages, open the live preview URL above. The deployed page uses `index.html` and public-safe mock data only.
