/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import http from 'http';

export default function securityHeadersMiddleware(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next: (err?: any) => void,
) {
  // Block any cross origin request.
  if (
    typeof req.headers.origin === 'string' &&
    !req.headers.origin.match(/^https?:\/\/localhost:/)
  ) {
    next(
      new Error(
        'Unauthorized request from ' +
          req.headers.origin +
          '. This may happen because of a conflicting browser extension. Please try to disable it and try again.',
      ),
    );
    return;
  }

  // Block requests to hosts other than localhost or 10.0.2.2 (EMULATOR_LOCALHOST)
  if (
    typeof req.headers.host !== 'string' ||
    !/^(localhost|10\.0\.2\.2):/.test(req.headers.host)
  ) {
    return next(new Error('invalid hostname'));
  }

  // Block MIME-type sniffing.
  res.setHeader('X-Content-Type-Options', 'nosniff');

  next();
}
