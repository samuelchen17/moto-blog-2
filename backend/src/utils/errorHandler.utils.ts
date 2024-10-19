import { NextFunction, Request, Response } from "express";

// Custom error class to store HTTP status code
export class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message); // Call the Error constructor
    this.statusCode = statusCode; // Assign statusCode to the instance
    Error.captureStackTrace(this, this.constructor); // Create stack trace for the error

    // log error
    console.error(`Error: ${message} (Status Code: ${statusCode})`);
  }
}

// user service error handler
export const userServiceErrorHandler = (
  error: unknown,
  message: string
): never => {
  if (error instanceof Error) {
    throw new Error(`${message}: ${error.message}`); // stop execution by throwing
  }
  throw new Error(`${message}: Unknown Error`);
};

// send formatted error back to the frontend
export const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message); // Log for backend purposes

  // If the error has a specific status code (like a 404 or 400), send it; otherwise, default to 500
  //   const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // determine status code
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || "An unknown error occurred";

  //   res.status(statusCode).json({
  //     error: err.message || "Internal Server Error", // Send formatted error to frontend
  //   });

  res.status(statusCode).json({
    status: "error",
    success: false,
    statusCode,
    message,
  });
};

// Error handler utility function
// export const errorHandler = (
//   statusCode: number,
//   message: string
// ): CustomError => {
//   return new CustomError(statusCode, message);
// };
