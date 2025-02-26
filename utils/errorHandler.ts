import type { NextApiResponse } from "next"

export class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const handleError = (error: unknown, res: NextApiResponse) => {
  console.error(error)

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message })
  }

  return res.status(500).json({ message: "An unexpected error occurred" })
}

