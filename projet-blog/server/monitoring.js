import { Registry, collectDefaultMetrics, Counter } from 'prom-client';
const register = new Registry();

// Métriques par défaut
collectDefaultMetrics({
  register,
  prefix: 'blog_'
});

// Compteur personnalisé pour les requêtes HTTP
const httpRequestsTotal = new Counter({
  name: 'blog_http_requests_total',
  help: 'Nombre total de requêtes HTTP',
  labelNames: ['method', 'path', 'status']
});

register.registerMetric(httpRequestsTotal);

export default { register, httpRequestsTotal }; 