import { NextResponse } from "next/server";

export function successResponse<T>(data: T, message = "Success", status = 200) {
  return NextResponse.json(
    {
      status: "success",
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(message = "Internal Server Error", status = 500, details?: unknown) {
  if (details) {
    console.error("API Error:", details);
  }
  return NextResponse.json(
    {
      status: "error",
      message,
    },
    { status }
  );
}
