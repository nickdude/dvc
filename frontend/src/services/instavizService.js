import axios from 'axios'

export const createInstavizLink = async (formData) => {
    try {
        const url = 'https://instaviz.me/cards/dvc/api/createlink'
        const res = await axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res.data
    } catch (err) {
        console.error('createInstavizLink error', err)
        throw err
    }
}
