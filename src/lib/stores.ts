import { writable } from 'svelte/store';
// Modal 组件弹框
export const model = writable({ show: false, message: '', delay: 2000 })

