// Generallly, never is used for error handling

export const createError = (): never => {
  throw new Error('error');
};
