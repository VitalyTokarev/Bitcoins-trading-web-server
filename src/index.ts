import dotenv from 'dotenv';
import { useExpressServer } from 'routing-controllers';
import express, { Express } from 'express';
import httpContext from 'express-http-context';
import pino from 'pino';
import expressPino from 'express-pino-logger';

import { UserController } from './controller/user-controller';
import { BitcoinController } from './controller/bitcoin-controller';
import { GlobalErrorHandler } from './middleware/global-error-handler';
import './model/repositroy';

dotenv.config();

const port = process.env.PORT;
const logger = pino({ level: process.env.LOG_LEVEL || 'info' }, pino.destination('./src/logs/info.log'));
const expressLogger = expressPino({ logger });
const app: Express = express();

app.use(expressLogger);
app.use(httpContext.middleware);
app.use(express.json());
useExpressServer(app, {
  controllers: [UserController, BitcoinController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
});

app.use(express.json());
app.use((req, res, next) => {
  logger.debug('Calling res.send');
  next();
});
app.listen(port, () => logger.info(`Running on port ${port}`));
