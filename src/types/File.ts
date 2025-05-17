
export type FileLoadBytesRequest = {
    bytes: ArrayBuffer;
}

export type FileLoadBytesResponse = {
    url: string;
}

export type FileLoadResponse = {
    url: string;
}
export type FileLoadPictureAndParseResponse = {
    id:string
    pid:string
    url:string
    picName:string
    introduction:string
    category:string
    tags:string[]
    picSize:number
    picWidth:number
    picHeight:number
    picScale:number
    picFormat:string
    userId:string
    createdAt:string
    editAt:string
    updatedAt:string
    webp:string
    thumbnailUrl:string
}
export type UploadPictureByUrlRequest = {
    url: string;
    spaceId: string;
}