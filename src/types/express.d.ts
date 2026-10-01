
declare global {
  namespace Express {
    interface ParamsDictionary {
      [key: string]: string;
    }

    interface Request {
      user?: {
        id: string;
        email: string;
        roleId: string;
        firstName?: string;
        lastName?: string;
      };

      requestId: string;
    }
  }
}

export {};

