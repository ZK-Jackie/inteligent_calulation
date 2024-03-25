import request from '@/utils/request'
// 用自己做的axios封装从后端获取路由信息
export const getCharts = () => {
    return request({
        url: '/getCharts',
        method: 'get'
    })
}