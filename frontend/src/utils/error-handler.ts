import { toast } from "src/components/ui/Toast";
import { AxiosError } from "axios";

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;
    toast({
      title: "Error",
      description: message,
      variant: "error",
    });
    return message;
  }

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";
  toast({
    title: "Error",
    description: message,
    variant: "error",
  });
  return message;
};
