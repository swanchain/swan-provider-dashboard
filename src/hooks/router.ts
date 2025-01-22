import type { Router } from 'vue-router'
import router from "@/router"

export function openPage(url: string) {
  window.open(url, '_blank')
}

export function openPageHttp(url: string) {
  if(url.indexOf('http') === -1) url = `https://${url}`
  window.open(url, '_blank')
}

export function toPage( path: string) {
  router.push(path)
}

export function toHome() {
  toPage('/')
}
