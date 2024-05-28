/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddUserBrowseDTO } from '../models/AddUserBrowseDTO';
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_PageResult_ } from '../models/BaseResponse_PageResult_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserBrowseControllerService {
    /**
     * 添加浏览记录
     * @param addUserBrowseDto addUserBrowseDTO
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addFansUsingPost1(
        addUserBrowseDto: AddUserBrowseDTO,
    ): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_browse/addUserBrowse',
            body: addUserBrowseDto,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询其他用户浏览数量
     * @param replyId
     * @returns BaseResponse_int_ OK
     * @throws ApiError
     */
    public static selectOtherUserBroseCountUsingGet(
        replyId?: number,
    ): CancelablePromise<BaseResponse_int_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_browse/selectOtherUserBroseCount',
            query: {
                'replyId': replyId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询用户浏览数量
     * @returns BaseResponse_int_ OK
     * @throws ApiError
     */
    public static selectUserBroseCountUsingGet(): CancelablePromise<BaseResponse_int_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_browse/selectUserBroseCount',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 分页查询浏览记录
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @returns BaseResponse_PageResult_ OK
     * @throws ApiError
     */
    public static selectUserBroseUsingGet(
        pageNum: number,
        pageSize: number,
    ): CancelablePromise<BaseResponse_PageResult_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_browse/selectUserBrows/{pageNum}/{pageSize}',
            path: {
                'pageNum': pageNum,
                'pageSize': pageSize,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
