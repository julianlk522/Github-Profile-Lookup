import { createContext, useReducer } from "react";
import UserResults from "../../components/users/UserResults";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = 'https://api.github.com/users'
const GITHUB_TOKEN = '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'

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)
    
    // get initial users
    const fetchUsers = async () => {
        setLoading()
        
        const response = await fetch(GITHUB_URL, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            },
        })

        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    // set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})
    
    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext