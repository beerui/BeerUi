const browser = typeof window !== 'undefined';

const TokenKey = 'jw_token'
const MenuKey = 'MENU_ACTIVE'

export function setToken(token) {
    browser && localStorage.setItem(TokenKey, token)
}

export function getToken() {
    return browser && (localStorage.getItem(TokenKey) || '')
}

export function removeToken() {
    return browser && localStorage.clear()
}


export function SET_MENU_ACTIVE(menu) {
    browser && localStorage.setItem(MenuKey, JSON.stringify(menu))
}

export function GET_MENU_ACTIVE() {
    return browser && (JSON.parse(localStorage.getItem(MenuKey)) || { active: '1', collapse: false })
}

export function CLEAR_MENU_ACTIVE() {
    return browser && localStorage.setItem(MenuKey, '{}')
}
