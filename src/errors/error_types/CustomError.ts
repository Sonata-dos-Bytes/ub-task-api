export class CustomError extends Error {
    public statusCode: number;
    public description: string[];
    constructor(message: string, description: string[], statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
      this.description = description;
    }
  }
  