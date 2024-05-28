/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestService {
    /**
     * test
     * @returns BaseResponse_int_ OK
     * @throws ApiError
     */
    public static testUsingGet(): CancelablePromise<BaseResponse_int_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Test/get',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
