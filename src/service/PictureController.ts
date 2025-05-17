import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  PictureAndUserFindByIdResponse, PictureCreateOutPaintingTaskRequest, PictureCreateOutPaintingTaskResponse,
  PictureEditRequest,
  PictureFindByIdRequest,
  PictureFindByIdResponse, PictureGetOutPaintingTaskResponse, PictureListEditRequest,
  PictureListRequest,
  PictureListResponse,
  PictureReviewRequest,
  PictureSearchByColorRequest,
  PictureSearchBySearchRequest,
  PictureSearchBySearchResponse,
  PictureTagCategoryResponse,
  PictureUpdateRequest,
  PictureUploadByBatchRequest,
  PictureUploadByBatchResponse,
  PictureUsingList
} from '@/types/picture'
import type { PageResult } from '@/types/Pages'




export const PictureEditAPI = (data: PictureEditRequest): Promise<ApiResponse<string>> => {
  return service.put('/v1/picture', data)
}


export const PictureUpdateAPI = (
  data: PictureUpdateRequest
): Promise<ApiResponse<string>> => {
  return service.post('/v1/picture', data)
}



export const PictureListAPI = (data: PictureListRequest): Promise<ApiResponse<PictureListResponse>> => {
  return service.post(`/v1/pictures`,data)
}
export const PictureUsingListAPI = (data: PictureListRequest): Promise<ApiResponse<PageResult<PictureUsingList>>> => {
  return service.post(`/v1/pictures/u`,data)
}
export const PictureDeleteAPI = (pid: string): Promise<ApiResponse<string>> => {
  return service.delete(`/v1/picture/${pid}`)
}

export const PictureTagCategory = (): Promise<ApiResponse<PictureTagCategoryResponse>> => {
  return service.get(`/v1/picture/tag-category`)
}

export const PictureFindByIdAPI = (data:PictureFindByIdRequest): Promise<ApiResponse<PictureFindByIdResponse>> => {
  return service.post(`/v1/picture/one`,data)
}

export const PictureAndUserFindByIdAPI = (pid:string): Promise<ApiResponse<PictureAndUserFindByIdResponse>> => {
  return service.get(`/v1/picture/u/${pid}`)
}

export const PictureReviewAPI = (data:PictureReviewRequest): Promise<ApiResponse<string>> => {
  return service.post(`/v1/picture/review`,data)
}

export const PictureUploadByBatchAPI = (data:PictureUploadByBatchRequest): Promise<ApiResponse<PictureUploadByBatchResponse>> => {
  return service.post(`/v1/picture/batch`,data,{
    timeout: 1000000
  })
}

export const PictureSearchByPictureAPI = (data:PictureSearchBySearchRequest): Promise<ApiResponse<PictureSearchBySearchResponse>> => {
  return service.post(`/v1/picture/search`,data)

}
export const PictureSearchByColorAPI = (data:PictureSearchByColorRequest): Promise<ApiResponse<PageResult<PictureUsingList>>> => {
  return service.post(`/v1/pictures/color`,data)
}
export const PictureListEditAPI = (data:PictureListEditRequest): Promise<ApiResponse<string>> => {
  return service.put(`/v1/pictures`,data)
}
export const PictureCreateOutPaintingTaskAPI = (data:PictureCreateOutPaintingTaskRequest): Promise<ApiResponse<PictureCreateOutPaintingTaskResponse>> => {
  return service.post(`/v1/picture/out`,data)
}
export const PictureGetOutPaintingTaskAPI = (task_id:string): Promise<ApiResponse<PictureGetOutPaintingTaskResponse>> => {
  return service.get(`/v1/picture/out/${task_id}`)
}
