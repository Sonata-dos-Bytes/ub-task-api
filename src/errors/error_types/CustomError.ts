export class CustomError extends Error {
    public statusCode: number;
    constructor(message: string, public description: string, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  