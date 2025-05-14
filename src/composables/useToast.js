/**
 * Composable for showing toast notifications across the application
 */
export function useToast() {
  /**
   * Show a toast notification
   * @param {string} title - The toast title
   * @param {string} message - The toast message
   * @param {string} type - The toast type: 'error', 'success', 'warning', 'info'
   * @param {number} timeout - Time in milliseconds before toast disappears (0 for no auto-close)
   */
  const showToast = (title, message, type = "info", timeout = 5000) => {
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: { title, message, type, timeout },
      })
    );
  };

  /**
   * Show an error toast notification
   * @param {string} title - The toast title
   * @param {string} message - The toast message
   * @param {number} timeout - Time in milliseconds before toast disappears
   */
  const showError = (title, message, timeout = 5000) => {
    showToast(title, message, "error", timeout);
  };

  /**
   * Show a success toast notification
   * @param {string} title - The toast title
   * @param {string} message - The toast message
   * @param {number} timeout - Time in milliseconds before toast disappears
   */
  const showSuccess = (title, message, timeout = 5000) => {
    showToast(title, message, "success", timeout);
  };

  /**
   * Show a warning toast notification
   * @param {string} title - The toast title
   * @param {string} message - The toast message
   * @param {number} timeout - Time in milliseconds before toast disappears
   */
  const showWarning = (title, message, timeout = 5000) => {
    showToast(title, message, "warning", timeout);
  };

  /**
   * Show an info toast notification
   * @param {string} title - The toast title
   * @param {string} message - The toast message
   * @param {number} timeout - Time in milliseconds before toast disappears
   */
  const showInfo = (title, message, timeout = 5000) => {
    showToast(title, message, "info", timeout);
  };

  /**
   * Show API error toast notification with appropriate message based on error
   * @param {Error} error - The error object from Axios or other API calls
   * @param {string} fallbackMessage - Fallback message if no specific error is found
   */
  const showApiError = (
    error,
    fallbackMessage = "An unknown error occurred"
  ) => {
    let title = "API Error";
    let message = fallbackMessage;

    if (error?.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      if (status === 404) {
        message = "The requested resource was not found";
      } else if (status === 401) {
        message = "Unauthorized access";
      } else if (status === 403) {
        message = "Access forbidden";
      } else if (status === 500) {
        message = "Internal server error";
      } else if (error.response.data?.message) {
        message = error.response.data.message;
      }
    } else if (error?.request) {
      // The request was made but no response was received
      title = "Network Error";
      message = "No response from server. Please check your connection.";
    } else if (error?.message) {
      // Something happened in setting up the request
      message = error.message;
    }

    showError(title, message);
  };

  return {
    showToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    showApiError,
  };
}
