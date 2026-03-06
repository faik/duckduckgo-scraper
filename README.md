# DuckDuckGo Scraper

A [Robomotion](https://robomotion.io) RPA flow that searches DuckDuckGo and exports the results to an Excel file.

## How It Works

1. **Prompts for a search query** via an input dialog box
2. **Opens a browser** and navigates to [duckduckgo.com](https://duckduckgo.com)
3. **Types the query** into the search box and submits it (via a subflow that clicks the search button)
4. **Waits for results** to load, then scrapes article titles and links using a browser script
5. **Parses the results** and writes them to `~/results.xlsx`

## Project Structure

- `main.ts` — Main flow definition (query input, browser automation, scraping, Excel export)
- `main.designer.ts` — Designer metadata (node positions, camera)
- `subflows/beeb5c.ts` — Subflow that clicks the DuckDuckGo search button
- `subflows/beeb5c.designer.ts` — Subflow designer metadata

## Output

An Excel file (`results.xlsx`) is created in the user's home directory with two columns:

| Title | Link |
|-------|------|
| Result title | Result URL |

## Requirements

- [Robomotion](https://robomotion.io) runtime with browser automation support
