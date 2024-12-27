import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'

export const uploadImage = (data: FormData): Promise<ApiResponse<string>> => {
  return service.post('/file/upload', data)
}

export const UploadFileWord = (data: FormData): Promise<ApiResponse<string>> => {
  return service.post('/file/uploadWord', data)
}

export const UploadFilePdf = (data: FormData): Promise<ApiResponse<string>> => {
  return service.post('/file/uploadPdf', data)
}

export const uploadWordOrPdf = (data: FormData): Promise<ApiResponse<string>> => {
  return service.post('/file/uploadPdf', data)
}