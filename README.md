# common-repo-workflow

This repository contains centralized GitHub Actions workflows used to automate tasks across multiple repositories.

### 🚀 Current Workflow

**update-donations.yml**  
Reusable workflow that standardizes and updates the donation section inside `README.md` files when they are changed. 

> Referenced by other repositories using `workflow_call`.

### 🔧 Usage in Other Repos

In your consuming repository, create a `.github/workflows/invoke-update.yml`:

```yaml
name: Trigger Central Donation Block Updater

on:
  push:
    paths:
      - "**/README.md"

jobs:
  call-update:
    uses: magicdude4eva/common-repo-workflow/.github/workflows/update-donations.yml@main
