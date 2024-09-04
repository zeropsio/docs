# Contributing to Zerops Docs

We're excited you're interested in contributing to our Turborepo-based Docusaurus documentation! This guide will help you get started.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18 or above)
- [Yarn](https://yarnpkg.com/) package manager

For installing dependencies faster using [Bun](http://bun.sh/): `bun install`

## Project Structure

This project uses Turborepo to manage a monorepo structure. The documentation site is likely one of the workspaces within this structure.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/repo-name.git`
3. Navigate to the project directory: `cd repo-name`
4. Install dependencies: `yarn`
5. Create a new branch: `git checkout -b your-branch-name`

## Running the Site Locally

1. Start the development server: `yarn dev`
   This command uses Turborepo to run the dev script in the documentation workspace.
2. Open your browser and visit `http://localhost:3001`.

## Making Changes

1. Make your changes in the appropriate workspace (likely in the `docs` or similar directory)
2. Test your changes locally using the development server
3. Run `yarn build` to ensure your changes don't cause build errors across the monorepo
4. Commit your changes: `git commit -m "Your descriptive commit message"`
5. Push to your fork: `git push origin your-branch-name`

## Submitting a Pull Request

1. Go to the original repository on GitHub
2. Click the "New pull request" button
3. Select your fork and the branch containing your changes
4. Fill out the pull request template with details about your changes
5. Submit the pull request

## Other Commands

- `yarn build`: Builds all workspaces in the monorepo
- `yarn lint`: Runs linting across all workspaces
- `yarn test`: Runs tests across all workspaces (if configured)

Check for more scripts in `package.json`.

Refer to the `turbo.json` file in the root of the repository for more details on the configured pipelines.

## Style Guide

- Use Markdown for all documentation files in the docs workspace
- Follow the [Docusaurus Markdown features](https://docusaurus.io/docs/markdown-features) guide
- Use sentence case for headings
- Keep line length to a maximum of 80 characters
- Use American English spelling
- Adapt to our pattern

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Need Help?

If you have any questions or need help with your contribution, please open an issue or reach out to the maintainers.

Thank you for contributing to Zerops Docs.
