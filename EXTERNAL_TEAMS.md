# Wakama Oracle - External Teams Quickstart

This document explains how an external lab or team can contribute real or simulated IoT data to the Wakama Oracle pipeline.

The goal is simple:

- you generate an agricultural or environmental sensor dataset for your own field or test site
- you keep your own team identity and GPS location
- Wakama ingests it into the open pipeline (IPFS + Solana devnet)
- your points appear in the global dashboard, with your team name

This file is part of the repository:
https://github.com/Wakama-Edge-Ventures/wakama-rwa-templates


## 1. Who this is for

This quickstart is for:

- university labs
- makerspaces
- tech clubs
- cooperatives and farmer groups
- research teams

You do not need to be a Solana expert. If you can run Node.js scripts and use GitHub, you are ready.


## 2. What you will do in less than one hour

In a normal session, your team will:

1. Fork this repository on GitHub
2. Clone your fork on your own machine
3. Create or adjust a generator script for your site (for example tomatoes in Bingerville, maize in Bouake, etc.)
4. Generate one or more JSON "batches" with realistic or Real values
5. Send the batch to Wakama or open a Pull Request so it can be added to the global pipeline
6. See your team name and points appear in the Wakama Oracle dashboard


## 3. Requirements

To follow this guide you need:

- a GitHub account
- Node.js 18 or higher installed
- basic Git usage (clone, commit, push)
- a text editor (VS Code, etc.)

You do not need:

- to manage your own Solana node / In the futur we can invit you to do it whit your ows nde
- to know how IPFS works internally  / In the futur we can invit you to do it whit your ows account
 

## 4. Fork and clone the templates repository

1. Open the main repo in your browser:

   https://github.com/Wakama-Edge-Ventures/wakama-rwa-templates

2. Click "Fork" in the top right corner and create a fork under your GitHub account or organization.

3. Then clone your fork locally:

   - Replace YOUR_ACCOUNT by your GitHub username or organization.

```bash
git clone https://github.com/YOUR_ACCOUNT/wakama-rwa-templates.git
cd wakama-rwa-templates
npm install
