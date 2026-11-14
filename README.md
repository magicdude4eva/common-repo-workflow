# common-repo-workflow

This repository contains centralized GitHub Actions workflows used to automate tasks across multiple repositories.

### 🚀 Current Workflow

**update-donations.yml**  
Reusable workflow that replaces the `## Donations are always welcome` section in every `README.md` of the calling repository with the canonical block from [`donations.md`](donations.md).

- The section runs from its heading up to the next `#`/`##` heading, or to the end of the file. `###` sub-headings are part of the section.
- READMEs without that heading are left untouched.
- `.git`, `node_modules`, `vendor` and `.venv` are skipped.

> Referenced by other repositories using `workflow_call`.

### ✏️ Changing the donation block

Edit [`donations.md`](donations.md) only. The file must start with `## Donations are always welcome`.

Consuming repositories pick up the change on their next run: on a README push, on the weekly schedule, or when started manually (see below).

Test locally against a checked-out repository:

```bash
cd /path/to/some-repo
node /path/to/common-repo-workflow/update-donations.js
git diff
```

### 🔧 Usage in Other Repos

In your consuming repository, create `.github/workflows/update-readme.yml`:

```yaml
name: Trigger Central Donation Block Updater

on:
  push:
    branches: [main]
    paths:
      - "**/README.md"
  schedule:
    - cron: "0 5 * * 1" # Weekly, so changes to donations.md propagate
  workflow_dispatch:

permissions:
  contents: write

jobs:
  call-update:
    uses: magicdude4eva/common-repo-workflow/.github/workflows/update-donations.yml@main
```

`permissions: contents: write` is required so the workflow can commit the updated README.

> **Note:** GitHub disables scheduled workflows in public repositories with no activity for 60 days. For quiet repos, re-enable it in the Actions tab or run it manually with `gh workflow run update-readme.yml -R magicdude4eva/<repo>`.
