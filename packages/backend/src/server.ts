import express from "express";
import cors from 'cors'
import http from "http";
import { app as appRoutes, wellKnown } from './routes';

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'development';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.raw({type: '*/*', limit: '1mb'}));

// Routes
app.use('/', appRoutes);
app.use('/.well-known', wellKnown);

// Health check
app.get('/', (req, res, next) => { res.json({status: 200}) })


// Start server
server.listen(port, () => {
  console.log(`\n🚀 Server ready at: http://localhost:${port}\n`);
  console.log(`\t* Running in ${mode} mode`);
});
