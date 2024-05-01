import request from '@/utils/request'
// 用自己做的axios封装从后端获取路由信息
import {BasicPension} from "@/views/GDProvince/components/BasicPension";
import {Policies} from "@/views/PoliciesInfo/components/Policies.js";
import {WordFrequency}  from "@/views/PoliciesInfo/components/WordFrequency";
export const getCharts = () => {
    return request({
        url: '/getCharts',
        method: 'get'
    })
}


// 查询区域大屏的数据
export function getRawData() {
    return Promise.resolve({
        code: 200,
        message: 'success',
        data : BasicPension
    })
    /*return request({
        url: '/getCharts/rawData',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })*/
}


// 查询政策大屏政策的数据
export function getPoliciesData() {
    return Promise.resolve({
        code: 200,
        message: 'success',
        data: Policies
    })
    /*return request({
        url: '/getCharts/PoliciesData',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })*/
}

// 查询政策大屏词云的数据
export function getWordFrequencyData() {
    return Promise.resolve({
        code: 200,
        message: 'success',
        data: WordFrequency
    })
    /*return request({
        url: '/getCharts/WordFrequencyData',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })*/
}
