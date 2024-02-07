import { LOGIN, SIGNOUT, NAVIGATE } from "./constants"

export const login = data => ({
    type: LOGIN,
    payload: {
        userId: data.userId,
    },
})
export const signOut = data => ({
    type: SIGNOUT,
    payload: {},
})
export const navigated = data => ({
    type: NAVIGATE,
    payload: {
        navigated: data.navigated
    },
})
