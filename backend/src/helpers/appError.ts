interface ErrorObj extends Error {
  statusCode?: number;
}

export const appError = (statusCode: number, message: string, err?: unknown) => {
  const error = new Error() as ErrorObj;
  error.statusCode = statusCode;
  error.message = message;
  return error;
};