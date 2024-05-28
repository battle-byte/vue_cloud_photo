/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddFansDTO } from '../models/AddFansDTO';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_PageResult_ } from '../models/BaseResponse_PageResult_';
import type { DeleteAttentionDTO } from '../models/DeleteAttentionDTO';
import type { OtherUserDTO } from '../models/OtherUserDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FansControllerService {
    /**
     * 设为关注
     * @param addFansDto addFansDTO
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addFansUsingPost(
        addFansDto: AddFansDTO,
    ): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/fans/addFans',
            body: addFansDto,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 取消关注
     * @param attentionDto attentionDTO
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteFansUsingPost(
        attentionDto: DeleteAttentionDTO,
    ): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/fans/deleteFans',
            body: attentionDto,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 批量获取关注信息
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @returns BaseResponse_PageResult_ OK
     * @throws ApiError
     */
    public static selectAttentionUsingGet(
        pageNum: number,
        pageSize: number,
    ): CancelablePromise<BaseResponse_PageResult_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fans/selectAttention/{pageNum}/{pageSize}',
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
    /**
     * 查询关注数量
     * @returns BaseResponse_int_ OK
     * @throws ApiError
     */
    public static selectAttentionCountUsingGet(): CancelablePromise<BaseResponse_int_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fans/selectAttentionCount',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询是否关注对方
     * @param otherUserDto otherUserDTO
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static selectAttentionCountOneUsingPost(
        otherUserDto: OtherUserDTO,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/fans/selectAttentionCountOne',
            body: otherUserDto,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 批量获取粉丝信息
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @returns BaseResponse_PageResult_ OK
     * @throws ApiError
     */
    public static selectFansUsingGet(
        pageNum: number,
        pageSize: number,
    ): CancelablePromise<BaseResponse_PageResult_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fans/selectFans/{pageNum}/{pageSize}',
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
    /**
     * 查询粉丝数量
     * @returns BaseResponse_int_ OK
     * @throws ApiError
     */
    public static selectFansCountUsingGet(): CancelablePromise<BaseResponse_int_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fans/selectFansCount',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询其他用户关注数量
     * @param replyId
     * @returns BaseResponse_int_ OK
     * @throws ApiError
     */
    public static selectOtherAttentionCountUsingGet(
        replyId?: number,
    ): CancelablePromise<BaseResponse_int_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fans/selectOtherAttentionCount',
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
     * 查询其他用户粉丝数量
     * @param replyId
     * @returns BaseResponse_int_ OK
     * @throws ApiError
     */
    public static selectOtherFansCountUsingGet(
        replyId?: number,
    ): CancelablePromise<BaseResponse_int_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fans/selectOtherFansCount',
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
}
