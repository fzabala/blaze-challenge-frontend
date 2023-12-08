export type ErrorResponseType = {
  message: string;
  errors?: ValidationError[];
};

export type ValidationError = {
  message: string;
  field: string;
  type: string;
};