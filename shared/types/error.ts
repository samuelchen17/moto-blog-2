export interface IErrorRes {
  status: "error";
  success: false;
  statusCode: number;
  message: string;
}
