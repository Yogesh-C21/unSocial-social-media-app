import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    /* user: {
        "_id": "63f4a7cbc84703ea1bce06f1",
        "username": "Eren",
        "email": "eren@gmail.com",
        "password": "$2b$10$QO48s5ruk/ZIxRCG3Rv3QO9gJIzFCEx/QXiktoBkBWC7FUXcJczMu",
        "profilePicture": "",
        "coverPicture": "",
        "followers": [
            "63f4a7e1c84703ea1bce06f3"
        ],
        "followings": [],
        "isAdmin": false,
        "createdAt": "2023-02-21T11:15:23.867Z",
        "updatedAt": "2023-02-21T11:32:44.143Z",
        "__v": 0
    }, */
    user: null,
    isFetching: false,
    error: false,
    isLoggedIn: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            isLoggedIn: state.isLoggedIn,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}