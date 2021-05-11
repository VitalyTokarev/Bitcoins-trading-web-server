import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: any, next: () => any) {
    response.status((error && error.httpCode) || 500).send({ ERROR: error });
    next();
  }
}
