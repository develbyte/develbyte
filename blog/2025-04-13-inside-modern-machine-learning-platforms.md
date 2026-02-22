---
slug: inside-modern-machine-learning-platforms
title: "Inside Modern Machine Learning Platforms: A Survey Across the Industry"
authors: narendra
tags: [distributed-systems, architecture, machine-learning]
date: 2025-04-13
---

Machine Learning (ML) is no longer just a research field or a niche corner of data science teams. Today, it's deeply embedded in products we use daily — be it your Uber ETA, Instagram feed, Netflix recommendations, or fraud detection in fintech. And the real magic behind deploying these models reliably, at scale, lies in how companies build their internal **ML platforms**.

In this post, we dive deep into how different organisations — ranging from tech giants to startups — are architecting their ML systems. We've compiled insights from real-world case studies, open-source projects, and platform blueprints to show how companies are solving the same problem with wildly different approaches.

<!--truncate-->

![ML Platform Computation Complexity](/img/computation-complexity)

We'll cover:

* What a typical ML platform looks like
* How tech companies like Uber, Facebook, Airbnb, and Instacart architect theirs
* Trade-offs in design: scalability vs. flexibility vs. cost
* The rise of open-source ML infrastructure
* When to consider managed cloud offerings like AWS SageMaker, Vertex AI, or Azure ML
* A comparison table to help you decide what's right for your org

Let's get started.

## What is a Machine Learning Platform, Really?

At a high level, a Machine Learning Platform is everything that sits between raw data and live predictions. Here's a common breakdown:

1. **Data Ingestion & Processing:** Scheduled or real-time pipelines (Spark, Airflow, Kafka)
2. **Feature Store:** A central system to define, compute, and serve features for ML
3. **Experimentation:** Notebook environments, experiment tracking, model training
4. **Model Registry:** Cataloging model artifacts, versions, metrics
5. **Deployment:** Real-time serving or batch prediction, often via APIs or cron jobs
6. **Monitoring:** Tracking model drift, latency, and performance degradation
7. **Orchestration:** Pipeline DAGs tying all the above together

This sounds like a lot — and it is. Which is why companies have taken vastly different paths depending on their scale, domain, and engineering maturity.

## The Tech Giants: Heavyweight End-to-End Platforms

### Uber: Michelangelo

Arguably one of the most referenced ML platforms in the industry.

Michelangelo isn't just a platform, it's a philosophy of consistency and scale. Designed to democratise ML across teams, The platform covered everything: data pipelines, a feature store, distributed training, a model registry, and serving infrastructure.

* **Palette (Feature Store):** Both offline and online features accessible via a common API, versioned and reusable.
* **Training Stack:** Uses Spark for distributed preprocessing and TensorFlow or XGBoost for model training. Includes auto-tuning and training across thousands of configurations.
* **Model Deployment:** Kubernetes-based serving with one-click deployments and autoscaling.
* **Monitoring:** Collects real-time performance metrics, model output distributions, and a proprietary model health score to trigger retraining.

Michelangelo powers ETA predictions, fraud models, driver allocation, and even supply-demand balancing models.

**Why it works:** Uber has high QPS, latency-sensitive products and ML is core to business (e.g. pricing, ETA). They needed strong guardrails.

**Trade-offs:** High engineering investment. Not for small teams.

### Facebook: FBLearner Flow

Facebook took a slightly different route. FBLearner was built to let _any engineer_ build and train ML models with minimal boilerplate.

A **Workflows-as-code** platform, built for internal reusability and speed:

* **Workflows-as-Code:** Define training pipelines as DAGs using Python APIs.
* **Pluggable Components:** Standardised modules for preprocessing, model training, evaluation, and deployment.
* **Experiment Management:** Automatically tracks every experiment, dataset, and outcome.
* **Scale:** At its peak, powered 6M predictions/sec across Facebook apps.

FBLearner also focused heavily on reuse: train once, serve anywhere. The internal adoption was massive — 25%+ of engineers were using it within a few years.

**Why it works:** At Facebook's scale, ML is everywhere. Democratisation and reuse matter more than custom infra per team.

**Trade-offs:** Deeply tied to Facebook infra. Not transferable.

### Airbnb: Bighead

Airbnb opted for modularity with a suite of focused tools:

* **Zipline:** Feature engineering as code; supports time-windowed feature computation and training-serving parity.
* **Bighead Lib:** Pipelines-as-Python for rapid experimentation.
* **Redspot:** Hosted notebook environments with consistent containers.
* **Deep Thought:** Wraps models into Docker services, adds observability, and deploys to Kubernetes.

Each component was replaceable, making the platform evolve-friendly. Most importantly, Bighead drastically reduced time-to-production for models.

**Why it works:** Airbnb needed consistency and productivity, not one-size-fits-all.

**Trade-offs:** Building many micro-components adds integration overhead.

## The Modular Approach: Open-Source Stacks

Companies without 100+ engineers can still build sophisticated ML platforms by stitching together open-source tools:

### Common OSS Stack:

* **Data Ingestion:** Airflow or Dagster for pipelines
* **Feature Engineering:** Feast or custom ETL over Snowflake/BigQuery
* **Training & Tracking:** MLflow, PyTorch Lightning, or TensorFlow with Optuna/Ray Tune
* **Model Registry & Deployment:** MLflow Model Registry, Seldon Core, BentoML
* **Serving:** KServe for scalable real-time inference
* **Monitoring:** Evidently, WhyLogs, Prometheus + Grafana

This approach gives full control, and avoids vendor lock-in.

**Real-World Example:** Instacart's Griffin ML platform combines Feast, Databricks, Ray, MLflow, and a custom orchestrator — scaled to hundreds of models without building from scratch.

**Trade-offs:** You own integration, observability, and scaling.

## Cloud-Managed ML Platforms

Cloud providers offer full-service ML stacks — great for startups, prototypes, or when internal DevOps resources are scarce.

### AWS SageMaker:

* **Feature Store, Model Registry, Pipelines, and Endpoints** all managed
* Tight integration with S3, Glue, CloudWatch, IAM
* Supports Bring-Your-Own-Container (BYOC) for custom model logic

### Google Vertex AI:

* Managed pipelines built on Kubeflow
* Integrated with BigQuery, GCS, AutoML, and Explainable AI
* Feature Store with real-time and batch support

### Azure ML:

* End-to-end model lifecycle with drag-drop UI or code-based SDKs
* Strong MLOps integrations with GitHub Actions and Azure DevOps

**Best for:** Teams that want to skip infrastructure and focus purely on modeling.

**Drawbacks:** Opaque internals, higher long-term cost, and limited flexibility.

## Databricks: The Lakehouse Approach to MLOps

Databricks deserves special mention as a platform that blends the benefits of a managed cloud platform with the openness and flexibility of OSS-based design.

If you don't want to go with self-managed OSS platform but still want OSS stack, Databricks by far the best Platform for all Data and ML Platform, little expensive then the Cloud solution but its worth the money spent.

### Why Databricks Stands Out:

* **Unified Lakehouse Architecture:** Combines the data warehouse and data lake into a single platform, making it easier to manage both structured and unstructured data in one place.
* **Native MLflow Integration:** As the creators of MLflow, Databricks offers best-in-class experiment tracking, model versioning, and model registry baked right into its platform.
* **Auto-scaling Compute:** Easily provision GPU/CPU clusters for ML workloads with zero DevOps involvement.
* **Delta Lake:** ACID-compliant, versioned data tables optimized for large-scale ML pipelines.
* **Model Deployment:** Supports batch inference via jobs or real-time endpoints with model serving. Integrates with Unity Catalog for governance and lineage.
* **Deep Collaboration Features:** Real-time collaborative notebooks with Git integration, commenting, and version history.

### Ideal For:

* Enterprises that want a **data-first ML platform**
* Teams already using Spark, Delta Lake, or lakehouse patterns
* Organizations looking for strong governance and secure data access (via Unity Catalog)

**Trade-offs:**

* Cost: Running heavy ML workloads at scale on Databricks can be expensive.
* Real-time deployment flexibility: Some teams find KServe or BentoML more flexible for specialized serving use cases.

Still, for many, Databricks hits the sweet spot of managed infrastructure, OSS compatibility, and platform maturity.

## Comparison Table

| Platform Type | Scale | Maintenance | Flexibility | Cost | Best For |
|--------------|-------|-------------|-------------|------|----------|
| In-House (Uber) | Very High | Very High | Very High | High | Large tech companies |
| Modular (Airbnb) | High | Medium | High | Medium | Mid-size product orgs |
| OSS Stack | High | Medium | Very High | Low to Med | Startups with ML infra teams |
| Cloud-Managed | Med-High | Low | Medium | Medium-High | Teams without infra engineers |
| Commercial AutoML | Medium | Low | Low | High | Traditional enterprises |

## Final Thoughts

There's no one right ML platform architecture. What matters is choosing something that aligns with your team's size, experience, and goals.

* If you're Uber or Facebook, you'll likely need to build.
* If you're a 20-person startup? Don't.
* If you're somewhere in the middle? Open-source + cloud might be your sweet spot.

Regardless of what you pick, the trends are clear: feature stores are no longer optional, monitoring is essential, and modularity is king. And as the tooling ecosystem matures, the barrier to building solid ML infra is lower than ever.

Have thoughts or want to share how your company does it? I'd love to hear from you.

---

*Can also read on [Medium](https://medium.com/develbyte/inside-modern-machine-learning-platforms-a-surveyacross-the-industry-fe2ed51e38c6)*

