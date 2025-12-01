const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './dist'
});

const port = process.env.PORT || 3001;

// Enable CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom routes (if needed)
server.use((req, res, next) => {
  // Add custom logic here
  next();
});

// Use /api prefix for all routes
server.use('/api', router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}/api`);
});

