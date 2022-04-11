import { createServer } from 'http';
import { parse } from 'url';
import { Registry, collectDefaultMetrics, Histogram } from 'prom-client';

const register = new Registry()

register.setDefaultLabels({
  app: 'node-app'
})

collectDefaultMetrics({ register })

const httpRequestDurationMicroseconds = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})

register.registerMetric(httpRequestDurationMicroseconds)

const createOrderHandler = async (req, res) => {

  if ((Math.floor(Math.random() * 100)) === 0) {
    throw new Error('Internal Error')
  }

  const delaySeconds = Math.floor(Math.random() * (6 - 3)) + 3
  await new Promise(res => setTimeout(res, delaySeconds * 1000))

  res.end('Order created successfully');
}

const server = createServer(async (req, res) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  const route = parse(req.url).pathname;

  try {
      if (route === '/metrics') {
        res.setHeader('Content-Type', register.contentType)
        res.end(register.metrics())
      }

      if (route === '/order') {
        await createOrderHandler(req, res)
      }

  } catch (error) {
    res.writeHead(500).end()
  }

  if (!res.finished) {
    res.writeHead(404).end()
  }

  end({ route, code: res.statusCode, method: req.method })
})

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080, metrics are exposed on http://localhost:8080/metrics')
})