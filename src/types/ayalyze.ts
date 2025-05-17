
type AnalyzeSpaceRequest ={
  spaceId :string
  queryPublic :boolean
  queryAll :boolean
}

type AnalyzeSpaceUsageRequest ={
  request :AnalyzeSpaceRequest
}

type AnalyzeSpaceUsageResponse ={
  usedSize :number
  maxSize :number
  usedCount :number
  maxCount :number
  sizeUsageRatio :number
  countUsageRatio :number
}

type AnalyzeSpaceCategoryRequest ={
  request :AnalyzeSpaceRequest
}

type AnalyzeSpaceCategory ={
  category :string
  count :number
  totalSize :number
}

type AnalyzeSpaceCategoryResponse ={
  data :AnalyzeSpaceCategory[]
}

type AnalyzeSpaceTagsRequest ={
  request :AnalyzeSpaceRequest
}

type AnalyzeSpaceTags ={
  tags :string
  count :number
}

type AnalyzeSpaceTagsResponse ={
  data :AnalyzeSpaceTags[]
}

type AnalyzeSpaceAnalyzeSizeRequest ={
  request :AnalyzeSpaceRequest
}

type AnalyzeSpaceSize ={
  sizeRange :string
  count :number
}

type AnalyzeSpaceAnalyzeSizeResponse ={
  data :AnalyzeSpaceSize[]
}

type AnalyzeSpaceAnalyzeUserRequest ={
  request :AnalyzeSpaceRequest
  userId :string
  timeDimension :string
}

type AnalyzeSpaceUser ={
  period :string
  count :number
}

type AnalyzeSpaceAnalyzeUserResponse ={
  data :AnalyzeSpaceUser[]
}

type AnalyzeSpaceRankAnalyzeRequest ={
  top :number
}

type AnalyzeSpaceRank ={
  id :string
  spaceName :string
  totalSize :number
  userId :string
}

type AnalyzeSpaceRankAnalyzeResponse ={
  data :AnalyzeSpaceRank[]
}


