import {findIndex} from 'lodash'

const baseUrl = 'http://127.0.0.1:8088' // @TODO: process.env.HOST ?

export default {
    fetchUsers: () => fetch(`${baseUrl}/api/users_with_photo`)
        .then(res => res.json())
}
