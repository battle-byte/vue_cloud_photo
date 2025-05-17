import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  FileLoadBytesRequest,
  FileLoadBytesResponse,
  FileLoadPictureAndParseResponse,
  FileLoadResponse, UploadPictureByUrlRequest
} from '@/types/File'
import type { RoleData } from '@/types/roles'
import type { PictureData } from '@/types/picture'

export const FileLoadAPI = (data: FormData): Promise<ApiResponse<FileLoadResponse>> => {
  return service.post('/v1/file/upload', data)
}

export const FileLoadAndParseAPI = (data: FormData): Promise<ApiResponse<FileLoadPictureAndParseResponse>> => {
  return service.post('/v1/file/parse', data)
}

export const FileLoadBytesAPi = (data: ArrayBuffer): Promise<ApiResponse<FileLoadBytesResponse>> => {
  return service.post('/file/bytes', data, {
    // headers: {
    //   'Content-Type': 'application/octet-stream' // 关键：声明字节流类型
    // }
  });
}
export const UploadPictureByUrlAPI = (data: UploadPictureByUrlRequest): Promise<ApiResponse<PictureData>> => {
  return service.post('/v1/file/url', data)
}