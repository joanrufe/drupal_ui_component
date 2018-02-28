const baseUrl = location.origin || 'http://drupalvm.test' // @TODO: process.env.HOST

export default {
    fetchUsers: () => fetch(`${baseUrl}/api/users_with_photo`)
        .then(res => res.json())
}
