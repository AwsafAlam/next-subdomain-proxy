# Next subdomain Proxy

We build a minimal app to investigate proxy in next.js
A simple package for proxying subdomains in a Next.js app.

### Installation

- `npm install`
- `npm run dev`

### Usage

First, create a next.config.js file in the root of your Next.js project if you don't already have one. Then, add the following code to it:

```js
module.exports = {
  // Your normal Next.js configuration goes here
  rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'api.example.com',
            },
          ],
          destination: '/api/:path*',
        },
      ],
    };
  },
};
```

### License

This package is released under the MIT license. See LICENSE for more details.
