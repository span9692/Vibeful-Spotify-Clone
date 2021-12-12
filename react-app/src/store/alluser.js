const GET_ALL_USERS = 'follow/GET_ALL_USERS'

const everyUser = (data) => {
    return {
        type: GET_ALL_USERS,
        data
    }
}

export const getAllUsers = () => async (dispatch) => {
    const response = await fetch('/api/follow/allUsers')
    const data = await response.json()
    dispatch(everyUser(data))
}

export default function reducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_USERS:
            newState = {};
            action.data.users.forEach(user => newState[user.id] = user)
            return newState
        default:
            return state;
    }
}
