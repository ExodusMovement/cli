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

  // Block requests to domains other than localhost to prevent DNS rebinding
  // attacks. Accessing directly through an IP address will be fine because
  // there is no DNS reolution involved.
  if (
    typeof req.headers.host !== 'string' ||
    !/^(localhost|\d+\.\d+\.\d+\.\d+|\[::1\]):/.test(req.headers.host)
  ) {
    return next(new Error('invalid hostname'));
  }

  // Block MIME-type sniffing.
  res.setHeader('X-Content-Type-Options', 'nosniff');

  next();
}
