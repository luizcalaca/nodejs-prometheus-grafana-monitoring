# Node.js Application Monitoring with Prometheus and Grafana

Exposes metrics on [http://localhost:8080/metrics](http://localhost:8080/metrics). The metrics are periodically got by [Prometheus](https://prometheus.io) and visualized through a [Grafana](https://grafana.com/oss/grafana) monitoring dashboard.

## Prerequisites

Docker and Docker Compose installed:

- [Docker Engine](https://docs.docker.com/engine)
- [Docker Compose](https://docs.docker.com/compose)

## Getting started

Clone the repository:

```bash
git clone https://github.com/luizcalaca/nodejs-prometheus-grafana-monitoring
```

Navigate into the project directory:

```bash
cd nodejs-prometheus-grafana-monitoring
```

Start the Docker containers:

```bash
docker-compose up -d
```

## Test containers

- Prometheus should be accessible via [http://localhost:9090](http://localhost:9090)
- Grafana should be accessible via [http://localhost:3000](http://localhost:3000)
- Example Node.js server metrics for RED monitoring should be accessible via [http://localhost:8080/metrics](http://localhost:8080/metrics)
