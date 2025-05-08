export function sendStatus(message: string) {
    return {
      message,
    };
  }
  
  export function sendMessageStatus(message: string, status: number) {
    return {
      status,
      message,
    };
  }
  
  export const sendSuccess = <T>(message: string, data: T | [] = []) => {
    return {
      message,
      data: data ?? [], // Ensure data is an empty array if not provided
    };
  };
  