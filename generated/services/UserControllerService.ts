/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_LoginUserVO_ } from '../models/BaseResponse_LoginUserVO_';
import type { BaseResponse_OtherUserVO_ } from '../models/BaseResponse_OtherUserVO_';
import type { BaseResponse_PageResult_ } from '../models/BaseResponse_PageResult_';
import type { BaseResponse_UserUpdateVO_ } from '../models/BaseResponse_UserUpdateVO_';
import type { UserLoginRequest } from '../models/UserLoginRequest';
import type { UserUpdateRequest } from '../models/UserUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * 批量获取个人信息
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @returns BaseResponse_PageResult_ OK
     * @throws ApiError
     */
    public static getListUserUsingGet(
        pageNum?: number,
        pageSize?: number,
    ): CancelablePromise<BaseResponse_PageResult_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/getListUserMessage',
            query: {
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
    /**
     * 获取个人信息
     * @returns BaseResponse_UserUpdateVO_ OK
     * @throws ApiError
     */
    public static getUserUsingGet(): CancelablePromise<BaseResponse_UserUpdateVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/getUserMessage',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 获取他人个人信息
     * @param replyId
     * @returns BaseResponse_OtherUserVO_ OK
     * @throws ApiError
     */
    public static getUserMessageByIdUsingGet(
        replyId?: number,
    ): CancelablePromise<BaseResponse_OtherUserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/getUserMessageById',
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
     * 微信登录
     * @param userLoginRequest userLoginRequest
     * @returns BaseResponse_LoginUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userWxLoginUsingPost(
        userLoginRequest: UserLoginRequest,
    ): CancelablePromise<BaseResponse_LoginUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
            body: userLoginRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 修改用户个人信息
     * @param userUpdateRequest userUpdateRequest
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userUpdateUsingPost(
        userUpdateRequest: UserUpdateRequest,
    ): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/updateMessage',
            body: userUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
