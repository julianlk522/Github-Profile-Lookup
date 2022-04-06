import axios from "axios"
const GITHUB_URL = 'https://api.github.com'

const github = axios.create({
    baseURL: GITHUB_URL,
    // headers: { Authorization: `token ${GITHUB_TOKEN}` }
})



// get search results
export const searchUsers = async (text) => {
    
    const params = new URLSearchParams({
        q: text
    })
    
    // const response = await fetch(
    //     `${GITHUB_URL}/search/users?${params}`
    //     // , {
    //     // headers: {
    //     //     Authorization: `token ${GITHUB_TOKEN}`
    //     // },
    //     // }
    // )

    // const {items} = await response.json()

    const response = await github.get(`/search/users?${params}`)

    return response.data.items
}



export const getUserAndRepos = async (login) => {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return { user: user.data, repos: repos.data }
}