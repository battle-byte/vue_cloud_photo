import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'


//空间资源占用分析
export const AnalyzeSpaceUsageAPI = (data:AnalyzeSpaceUsageRequest): Promise<ApiResponse<AnalyzeSpaceUsageResponse>> => {
  return service.post('/v1/analyze/usage',data)
}

//空间资源占用分析
export const AnalyzeSpaceCategoryAPI = (data:AnalyzeSpaceCategoryRequest): Promise<ApiResponse<AnalyzeSpaceCategoryResponse>> => {
  return service.post('/v1/analyze/category',data)
}

//空间分类分析
export const AnalyzeSpaceTagsAPI = (data:AnalyzeSpaceTagsRequest): Promise<ApiResponse<AnalyzeSpaceTagsResponse>> => {
  return service.post('/v1/analyze/tags',data)
}

//空间分类分析
export const AnalyzeSpaceAnalyzeSizeAPI = (data:AnalyzeSpaceAnalyzeSizeRequest): Promise<ApiResponse<AnalyzeSpaceAnalyzeSizeResponse>> => {
  return service.post('/v1/analyze/size',data)
}
//空间分类分析
export const AnalyzeSpaceAnalyzeUserAPI = (data:AnalyzeSpaceAnalyzeUserRequest): Promise<ApiResponse<AnalyzeSpaceAnalyzeUserResponse>> => {
  return service.post('/v1/analyze/user',data)
}

//空间分类分析
export const AnalyzeSpaceRankAnalyzeAPI = (data:AnalyzeSpaceRankAnalyzeRequest): Promise<ApiResponse<AnalyzeSpaceRankAnalyzeResponse>> => {
  return service.post('/v1/analyze/rank',data)
}
