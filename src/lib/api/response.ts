import { NextResponse } from "next/server";


/*
* Success response
* @param data - Data to be returned
* @param message - Message to be returned
* @param statusCode - Status code to be returned
*/
export const successResponse = (
  data: unknown,
  message: string = "Success",
  statusCode: number = 200
) => {
  return NextResponse.json({
    status: statusCode,
    success: true,
    message,
    data,
  });
};


/*
* Error response
* @param message - Message to be returned
* @param statusCode - Status code to be returned
* @param error - Error to be returned
*/
export const errorResponse = (
  message: string,
  statusCode: number = 400,
  error?: unknown
) => {
  return NextResponse.json({
    status: statusCode,
    success: false,
    message,
    error,
  });
};
