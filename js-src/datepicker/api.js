import Waterwheel from 'waterwheel'

const waterwheel = new Waterwheel({
    base: 'http://127.0.0.1:8088',
    oauth: {
        grant_type: 'password',
        client_id: '07d7a37a-57d9-4c3d-9142-7438b5d52657', // Put your own credentials
        client_secret: '1234567890', // Put your own credentials
        username: 'admin', // Put your own credentials
        password: 'admin' // Put your own credentials
    }
})

const api = waterwheel.jsonapi;

export default {
    fetchUsers: () => api.get('user/user', {}).then(res => res.data)
}