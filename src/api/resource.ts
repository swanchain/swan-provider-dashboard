import { request } from '@/utils/request'

export function getStatsResourceData() {
  return request({
      headers: {},
      url: `${import.meta.env.VITE_BASE_URL}v1/stats/resources`,
      method: 'get'
  })
}

export function getGPUsData() {
  return request({
      headers: {},
      url: `${import.meta.env.VITE_BASE_URL}v1/gpus`,
      method: 'get'
  })
}

export function submitGPUEstimate(data:any) {
  return request({
    headers: {},
    url: `${import.meta.env.VITE_BASE_URL}v1/gpus/estimate`,
    method: 'post',
    data
  })
}