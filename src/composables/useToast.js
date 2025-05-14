/**
 * Este es mi composable para mostrar notificaciones toast en toda la aplicación
 * Un composable es como un custom hook en React, pero para Vue - me encanta esta característica de Vue 3!
 */
export function useToast() {
  /**
   * Función base para mostrar una notificación toast
   * Uso un CustomEvent para comunicarme entre componentes sin necesidad de props/emits
   *
   * @param {string} title - El título del toast
   * @param {string} message - El mensaje del toast
   * @param {string} type - El tipo de toast: 'error', 'success', 'warning', 'info'
   * @param {number} timeout - Tiempo en milisegundos antes de que desaparezca (0 para que no se cierre automáticamente)
   */
  const showToast = (title, message, type = "info", timeout = 5000) => {
    // Uso eventos custom del navegador para comunicarme con el componente ToastMessage
    // Esto me permite mostrar toasts desde cualquier parte de la app sin pasar props
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: { title, message, type, timeout },
      })
    );
  };

  /**
   * Función para mostrar un toast de error (rojo)
   * Esta es un wrapper sobre showToast para simplificar su uso
   *
   * @param {string} title - El título del toast
   * @param {string} message - El mensaje del toast
   * @param {number} timeout - Tiempo en ms antes de que desaparezca
   */
  const showError = (title, message, timeout = 5000) => {
    showToast(title, message, "error", timeout);
  };

  /**
   * Función para mostrar un toast de éxito (verde)
   * Uso esto cuando la operación se completa correctamente
   *
   * @param {string} title - El título del toast
   * @param {string} message - El mensaje del toast
   * @param {number} timeout - Tiempo en ms antes de que desaparezca
   */
  const showSuccess = (title, message, timeout = 5000) => {
    showToast(title, message, "success", timeout);
  };

  /**
   * Función para mostrar un toast de advertencia (amarillo)
   * Para alertar al usuario de algo importante pero no crítico
   *
   * @param {string} title - El título del toast
   * @param {string} message - El mensaje del toast
   * @param {number} timeout - Tiempo en ms antes de que desaparezca
   */
  const showWarning = (title, message, timeout = 5000) => {
    showToast(title, message, "warning", timeout);
  };

  /**
   * Función para mostrar un toast informativo (azul)
   * Para mensajes neutros o informativos
   *
   * @param {string} title - El título del toast
   * @param {string} message - El mensaje del toast
   * @param {number} timeout - Tiempo en ms antes de que desaparezca
   */
  const showInfo = (title, message, timeout = 5000) => {
    showToast(title, message, "info", timeout);
  };

  /**
   * Esta función especial maneja errores de API
   * Analiza el objeto de error de Axios y muestra un mensaje apropiado
   * Muy útil para no repetir lógica en cada llamada API
   *
   * @param {Error} error - El objeto de error de Axios u otras llamadas API
   * @param {string} fallbackMessage - Mensaje por defecto si no se encuentra un error específico
   */
  const showApiError = (
    error,
    fallbackMessage = "An unknown error occurred"
  ) => {
    let title = "API Error";
    let message = fallbackMessage;

    if (error?.response) {
      // La petición se hizo y el servidor respondió con un código de estado
      // que cae fuera del rango 2xx (éxito)
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
        // Si la API devuelve un mensaje específico, lo uso
        message = error.response.data.message;
      }
    } else if (error?.request) {
      // La petición se hizo pero no se recibió respuesta
      // Esto suele ser un problema de red o servidor apagado
      title = "Network Error";
      message = "No response from server. Please check your connection.";
    } else if (error?.message) {
      // Algo ocurrió al configurar la petición
      // Estos son errores del cliente, no del servidor
      message = error.message;
    }

    showError(title, message);
  };

  // Expongo todas las funciones para usarlas donde las necesite
  return {
    showToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    showApiError,
  };
}
