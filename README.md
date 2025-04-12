# @tfpkgr/http-wrap

## Overview

`@tfpkgr/http-wrap` is a utility package designed to simplify error handling in Express.js route handlers. It wraps your route logic in a function that ensures errors are caught and passed to the next middleware, improving code readability and maintainability.

## Installation

Install the package using npm:

```bash
npm install @tfpkgr/http-wrap
```

## Usage

Here is an example of how to use the `HttpWrap` utility in your Express application:

```typescript
import express from 'express';
import {HttpWrap} from '@tfpkgr/http-wrap';

const app = express();

// Define a route using HttpWrap
app.get(
	'/example',
	HttpWrap(async (req, res) => {
		// Your route logic here
		const data = {message: 'Hello, world!'};
		res.json(data);
	}),
);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({error: 'Internal Server Error'});
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
```

## Features

-   Simplifies error handling in Express.js route handlers.
-   Ensures unhandled errors are passed to the next middleware.
-   Improves code readability and maintainability.

## API

### `HttpWrap(callback: HttpWrapCallback): HttpWrapReturn`

Wraps an Express route handler with error handling.

#### Parameters

-   `callback` (Function): The route handler logic to be wrapped. It takes the following parameters:
    -   `req` (Request): The Express Request object.
    -   `res` (Response): The Express Response object.

#### Returns

-   A function that can be used as an Express middleware.

## License

This package is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
