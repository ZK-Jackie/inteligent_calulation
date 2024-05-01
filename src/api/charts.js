import request from '@/utils/request'
// 用自己做的axios封装从后端获取路由信息
import {BasicPension} from "@/views/GDProvince/components/BasicPension";
import {Policies} from "@/views/PoliciesInfo/components/Policies.js";
import {WordFrequency}  from "@/views/PoliciesInfo/components/WordFrequency";
import {previewTestData} from "@/views/ParamSetting/TestDetail";
import {H_population101, M_population102, L_population103,RadarData1} from '@/views/GDProvince/gdData1.js';
import {
    income_and_expense02,
    participants02,
    H_population201,
    L_population203,
    M_population202,
    pieData_pension201,
    RadarData2,
    pieData_pension202,
    pieData_pension203,
    lineData_basic01
} from "@/views/GDProvince/gdData2";
import {income_and_expense01, participants01} from "@/views/GDProvince/gdData";
import {
    pieData_pension01,
    pieData_pension02,
    pieData_pension03,
} from "@/components/TestDetail";
import {barData} from "@/components/TestDetail";
import {lineData} from "@/components/TestDetail";
import {pieData} from "@/components/TestDetail";
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

// 查询参数调配大屏的数据
export function getPopulationData() {
    return Promise.resolve({
        code: 200,
        message: 'success',
        data: {
            H_population101,
            M_population102,
            L_population103,
            H_population201,
            M_population202,
            L_population203,
            income_and_expense01,
            participants01,
            pieData_pension01,
            pieData_pension02,
            pieData_pension03,
            RadarData1,
            RadarData2,
            income_and_expense02,
            participants02,
            pieData_pension201,
            pieData_pension202,
            pieData_pension203,
            lineData_basic01
        }
    })
    /*return request({
        url: '/getCharts/PopulationData',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })*/
}

// 查询参数调配大屏的数据
export function getPreviewData() {
    return Promise.resolve({
        code: 200,
        message: 'success',
        data: previewTestData
    })
    /*return request({
        url: '/getCharts/PreviewData',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })*/
}

// 查询区域大屏的数据
export function getGDData() {
    return Promise.resolve({
        code: 200,
        message: 'success',
        data: {
            H_population101,
            M_population102,
            L_population103,
            H_population201,
            M_population202,
            L_population203,
            income_and_expense01,
            participants01,
            pieData_pension01,
            pieData_pension02,
            pieData_pension03,
            RadarData1,
            RadarData2,
            income_and_expense02,
            participants02,
            pieData_pension201,
            pieData_pension202,
            pieData_pension203,
            lineData_basic01
        }
    })
    /*return request({
        url: '/getCharts/GDData',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })*/
}
