/**
 * Standard API response format untuk Al-Furqon Backend
 */
export class ApiResponse {
  /**
   * Success response
   */
  static success(data: any, message: string = 'Success', meta: any = {}) {
    return {
      success: true,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta
      }
    };
  }

  /**
   * Error response
   */
  static error(message: string = 'Error occurred', error: any = null, statusCode: number = 500) {
    const response: any = {
      success: false,
      message,
      meta: {
        timestamp: new Date().toISOString(),
        statusCode
      }
    };

    if (error) {
      response.error = error;
    }

    return response;
  }

  /**
   * Paginated response
   */
  static paginated(data: any[], pagination: any, message: string = 'Data retrieved successfully') {
    return {
      success: true,
      message,
      data,
      pagination: {
        current_page: pagination.page,
        per_page: pagination.limit,
        total: pagination.total,
        total_pages: Math.ceil(pagination.total / pagination.limit),
        has_prev: pagination.page > 1,
        has_next: pagination.page < Math.ceil(pagination.total / pagination.limit)
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    };
  }
}
