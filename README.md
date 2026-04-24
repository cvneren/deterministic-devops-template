# Deterministic DevOps Template

<div align="center">
  <br />
  <a href="https://cvneren.github.io/deterministic-devops-template/docs/index.html">
    <img src="https://img.shields.io/badge/CLICK_HERE_TO_VIEW_INTERACTIVE_ARCHITECTURE_%26_DORA_METRICS_REPORT-0A66C2?style=for-the-badge" alt="View Interactive Report" />
  </a>
  <br />
  <br />
</div>

## Executive Summary

This repository provides a hardened, production-ready Fullstack Boilerplate. It replaces ad-hoc scripting with deterministic, strictly enforced engineering pipelines. The architecture is engineered to minimize attack surfaces, mandate automated versioning, and guarantee code quality before integration.

The stack comprises a **Next.js** frontend and a **FastAPI** backend. Both services are containerized utilizing optimized Multi-Stage Dockerfiles and are governed by strict CI/CD guardrails that block unverified code from reaching the primary branch.

## Getting Started

### Local Development

The project utilizes Docker Compose to orchestrate local development, complete with live-reloading and internal networking.

To start the local environment, execute:

```bash
docker-compose up --build
```

- **Frontend:** Accessible at `http://localhost:3000`
- **Backend (API):** Accessible at `http://localhost:8000`

### Committing Code (Git Hooks)

Ensure you have installed the root dependencies to initialize the local Git Hooks:

```bash
npm install
```

When creating a commit, Husky will automatically intercept the process to run Prettier, ESLint, and Commitlint against your staged files. Your commit message must adhere to the Conventional Commits specification:

```bash
# Example of a valid commit
git commit -m "feat: setup initial authentication middleware"
```

## The Four Architectural Pillars

The design of this repository is directly informed by empirical data, including DORA metrics and NIST standards. For an exhaustive, data-driven justification of these patterns, refer to the [Architecture Specification](./docs/ARCHITECTURE_SPEC.md).

### 1. Shift-Left Quality Guardrails (Husky & lint-staged)

Defect remediation costs increase exponentially the later a bug is caught in the Software Development Life Cycle (SDLC). By utilizing Git Hooks via **Husky** and **lint-staged**, we enforce formatting and linting directly on the developer's local machine before a commit is created. This immediate feedback loop saves remote CI compute minutes and eliminates reviewer fatigue regarding syntax errors.

### 2. Conventional Commits & SemVer

This repository strictly enforces the [Conventional Commits](https://www.conventionalcommits.org/) specification using `@commitlint`. By mandating machine-readable commit prefixes (e.g., `feat:`, `fix:`), we guarantee a clean, deterministic git history. This convention enables the CI pipeline to automatically compute Semantic Versioning (SemVer) bumps and dynamically generate release changelogs without subjective human intervention.

### 3. Strict CI/CD Integration (GitHub Actions & Trivy)

Our GitHub Actions pipeline acts as the final immutable gatekeeper. Mirroring DORA "Elite Performer" standards, the pipeline automatically lints the codebase, builds the application containers, and executes security vulnerability scanning using **Trivy** on every Pull Request. The `main` branch remains protected at all times; unverified code cannot be merged.

### 4. Container Minimalization (Docker Multi-Stage Builds)

Single-stage Docker images inherit severe vulnerabilities by including package managers, compilers, and shell utilities in the production artifact. We utilize **Multi-Stage Dockerfiles** to strictly separate the compilation environment from the runtime environment. The final runtime artifacts copy only the built binaries (Next.js standalone output and Python wheels) into minimal Alpine or Slim images. This process reduces image sizes by up to 90% and mathematically eradicates entire classes of CVEs by minimizing the attack surface.

## Tech Stack

### Frontend

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Containerization:** Node.js Alpine (Multi-Stage standalone output)

### Backend

- **Framework:** FastAPI
- **Language:** Python 3.11
- **Server:** Uvicorn
- **Containerization:** Python Slim (Multi-Stage wheel compilation)

### CI/CD & Pipeline Infrastructure

- **Orchestration:** Docker Compose
- **CI/CD Platform:** GitHub Actions
- **Container Security:** Trivy Vulnerability Scanner
- **Local Enforcement:** Husky, lint-staged, commitlint, Prettier, ESLint
