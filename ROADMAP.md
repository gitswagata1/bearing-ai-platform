# Roadmap

## Vision

An AI-assisted operations suite for bearing manufacturers that turns inspection images,
machine signals and procurement data into faster quotes, fewer defects and less downtime.

> **Status.** The backend currently returns **simulated** data to demonstrate the product
> experience. The roadmap replaces each simulated router with real models and data.

## Milestones

### Now

- [ ] **Inspection:** replace the simulated result with a trained defect classifier (start with a public bearing-defect dataset) and report confidence honestly
- [ ] **Maintenance:** anomaly detection on vibration data using a public benchmark such as CWRU or NASA IMS
- [ ] Persist quotes and inspections in a database (PostgreSQL)
- [ ] Add authentication

### Next

- [ ] **Failure analysis:** retrieval over a curated failure-mode knowledge base with an LLM explainer
- [ ] **Quotation:** pricing rules engine plus a learned win-probability model
- [ ] **Sourcing:** demand forecasting with backtests against a naive baseline
- [ ] Docker Compose and a deployed demo

### Later

- [ ] Edge deployment for line-side cameras
- [ ] ERP integration (SAP, Tally) through adapters
- [ ] Multi-plant and multi-tenant support

## Where this can go

| Direction        | Idea |
| ---------------- | ---- |
| **Startup**      | Vertical AI for mid-size precision manufacturers in India: quote turnaround, defect detection and predictive maintenance as one subscription. |
| **Publication**  | Benchmark study: lightweight defect classifiers for bearing surface inspection on commodity hardware; comparison of vibration anomaly detectors on public datasets. |
| **Patent**       | Candidate areas to discuss with a patent attorney: multi-signal fusion of vision and vibration data for remaining-useful-life estimation. |

> **Note on intellectual property.** File before disclosing novel methods publicly, since
> public disclosure can bar patentability in many jurisdictions.

## How to help

Datasets, models and tests are especially welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).
