import Waterwheel from 'waterwheel'
import {findIndex} from 'lodash'

const baseUrl = 'http://127.0.0.1:8088' // @TODO: process.env.HOST ?

const waterwheel = new Waterwheel({
  base: baseUrl,
  oauth: {
    grant_type: 'password',
    client_id: '07d7a37a-57d9-4c3d-9142-7438b5d52657', // @TODO: move to process.env
    client_secret: '1234567890', // @TODO: move to process.env
    username: 'admin', // @TODO: move to process.env
    password: 'admin' // @TODO: move to process.env
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
            const index = findIndex(reducedData, {
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
