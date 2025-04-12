import {NextFunction, Request, Response} from 'express';

/**
 * HttpWrapCallback is a type that represents a callback function
 * used in the Wrap function. It takes an Express Request and Response
 * object as parameters and returns a Promise or a value.
 *
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A Promise or a value.
 */
export type HttpWrapCallback = (
	req: Request,
	res: Response,
) => Promise<unknown> | unknown;

/**
 * HttpWrapReturn is a type that represents the return type of the
 * Wrap function. It takes an Express Request, Response, and NextFunction
 * as parameters and returns a Promise that resolves to void.
 *
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The NextFunction to call the next middleware.
 * @returns A Promise that resolves to void.
 */
export type HttpWrapReturn = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>;

/**
 * Wraps an Express route handler with error handling.
 *
 * This function takes a callback that represents the core logic of an Express route
 * and returns a new function that ensures errors are caught and passed to the next middleware.
 *
 * @param callback - The route handler logic to be wrapped.
 * @returns A function that can be used as an Express middleware.
 */
export default function HttpWrap(callback: HttpWrapCallback): HttpWrapReturn {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await callback(req, res);

			// If the result is an error, pass it to the next middleware.
			if (result instanceof Error) {
				throw result;
			}

			// If the response is already sent, do not call next.
			if (res.headersSent) {
				return;
			}

			// Proceed to the next middleware if no errors occurred and response is not handled.
			next();
		} catch (error) {
			// Log the error with additional context for better debugging.
			console.error(`Error in ${req.method} ${req.url}:`, error);

			// Pass the error to the next middleware for centralized error handling.
			next(error instanceof Error ? error : new Error(String(error)));
		}
	};
}
