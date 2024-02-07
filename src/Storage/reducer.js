import { LOGIN, NAVIGATE, SIGNOUT} from "./constants"

const initialState = {
    isLoggedIn: false,
    userId: '',
    navigated:'Home',
}

export const inkartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userId: action.payload.userId,
                isLoggedIn: true,
            }
        case NAVIGATE:
            return {
                ...state,
                navigated: action.payload.navigated,
            }
        case SIGNOUT:
            return {
                ...state,
                userId: '',
                isLoggedIn: false,
            }

        default: return state
    }
}