export interface ErrorResponse {
    status: number;
    error: {
        message: string;
    }
}

export interface SuccessResponse {
    status: number;
    data: {
        message: string;
    }
}

