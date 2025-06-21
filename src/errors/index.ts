import type { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

export interface ApiError {
  status: ContentfulStatusCode;
  code: string;
  message: string;
}

export const ERRORS: Record<string, ApiError> = {
  INVALID_PAYLOAD: {
    status: 400,
    code: "INVALID_PAYLOAD",
    message: "Invalid data in request",
  },
  WRONG_PASSWORD: {
    status: 401,
    code: "WRONG_PASSWORD",
    message: "The password provided is incorrect.",
  },
  UNAUTHORIZED: {
    status: 401,
    code: "UNAUTHORIZED",
    message: "Not authorized",
  },
  NOT_FOUND: {
    status: 404,
    code: "NOT_FOUND",
    message: "The requested resource was not found.",
  },
  USER_DOESNT_EXIST: {
    status: 404,
    code: "USER_DOESNT_EXIST",
    message: "A user with this email address does not exist.",
  },
  USER_ALREADY_EXISTS: {
    status: 409,
    code: "USER_ALREADY_EXISTS",
    message: "A user with this email address already exists.",
  },
  ITEM_ALREADY_EXISTS: {
    status: 409,
    code: "ITEM_ALREADY_EXISTS",
    message: "Item already exists.",
  },
};

export function sendError(c: Context, error: ApiError) {
  return c.json(
    {
      error: {
        code: error.code,
        message: error.message,
      },
    },
    error.status
  );
}
