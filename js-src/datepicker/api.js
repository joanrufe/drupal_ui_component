import Waterwheel from 'waterwheel'
import _ from 'lodash'

const baseUrl = 'http://127.0.0.1:8088'

const waterwheel = new Waterwheel({
  base: baseUrl,
  oauth: {
    grant_type: 'password',
    client_id: '07d7a37a-57d9-4c3d-9142-7438b5d52657', // Put your own credentials
    client_secret: '1234567890', // Put your own credentials
    username: 'admin', // Put your own credentials
    password: 'admin' // Put your own credentials
  }
})

const api = waterwheel.jsonapi;

function mergeData(res, fieldName) {
    const {data, included} = res
    const includedType = included[0].type
    return data.map(item => {
        const idData = item.relationships[fieldName].data
        if(idData !== null){
            const reducedData = included.map(({attributes, id})=> ({
                ...attributes,
                id
            }))
            const index = _.findIndex(reducedData, { 
                id: idData.id
            })
            item.attributes[fieldName] = reducedData[index]
            return item
        }else{
            return item
        }
    })
}

export default {
    fetchUsers: () => api.get('user/user', {
        include: 'user_picture, file--file',
        fields:{
            'user_picture': 'url',
            'file--file': 'url,uri'
        }
    })
    .then(res => mergeData(res, 'user_picture')),
  fetchRelated: url => fetch(url).then(res => res.json()),
  HOST: baseUrl
}
