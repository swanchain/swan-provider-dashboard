import type { IOption } from 'types/common'

export const activeMenuPath = ref('')

export const menus = ref<IOption[]>([
  { label: 'Overview', value: '/overview' },
  { label: 'FCP List', value: '/rankings/fcp' },
  { label: 'ECP List', value: '/rankings/ecp' },
  { label: 'Resource', value: '/resource' },
  { label: 'Calculator', value: '/calculator' },
  { label: 'My CPs', value: '/my-cp' },
  {
    label: 'SWAN CP UBI', value: '',
    children: [
      { label: 'FCP Leaderboard', value: '/ubi0/fcp' },
      { label: 'ECP Leaderboard', value: '/ubi0/ecp' }]
  }
])
