interface ApiError {
  message: string;
  code?: string;
  additionalInfo?: any;
}

export const handleApiError = (
  error: any,
  defaultMessage: string
): ApiError => {
  return {
    message: error.response?.data?.error?.message || defaultMessage,
    code: error.response?.data?.error?.code,
    additionalInfo: error.response?.data?.error?.additionalInfo,
  };
};
