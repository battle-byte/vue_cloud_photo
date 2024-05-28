// 定义通用响应结构
export type ApiResponse<T> = {
  code: number;
  data: T;
  message: string;
}