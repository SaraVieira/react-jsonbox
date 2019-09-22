import { useState, useContext } from 'react'
import JsonBoxContext from './context'
import axios from 'axios/dist/axios.min'

function useJsonBox() {
  const { url = 'https://jsonbox.io', id } = useContext(JsonBoxContext)
  const [readLoading, setReadLoading] = useState(true)

  const getUrl = (collection, config = {}) => {
    let link = `${url}/${id}`
    const { sort, skip, limit, query } = config

    if (collection) {
      link = `${link}/${collection}`
    }

    let parameters = new Map()
    if (sort) {
      parameters.set('sort', sort)
    }
    if (skip) {
      parameters.set('skip', skip)
    }
    if (limit) {
      parameters.set('limit', limit)
    }
    if (query) {
      parameters.set('q', query)
    }

    if (parameters.size > 0) {
      link = `${link}?${[...parameters.keys()]
        .map(key => `${key}=${parameters.get(key)}`)
        .join('&')}`
    }

    return link
  }

  const read = async (collection, config) => {
    setReadLoading(true)
    const response = await axios.get(getUrl(collection, config))
    setReadLoading(false)

    return {
      data: response.status === 200 ? response.data : false,
      loading: readLoading
    }
  }

  const create = async (data, collection) => {
    setReadLoading(true)
    const response = await axios.post(getUrl(collection), data)
    setReadLoading(false)

    return {
      data: response.status === 200 ? response.data : false,
      loading: readLoading
    }
  }

  const update = async (data, recordId) => {
    setReadLoading(true)
    const response = await axios.put(getUrl(recordId), data)
    setReadLoading(false)

    return {
      data: response.status === 200 ? response.data : false,
      loading: readLoading
    }
  }

  const remove = async recordId => {
    console.log(recordId)
    setReadLoading(true)
    const response = await axios.delete(getUrl(recordId))
    setReadLoading(false)

    return {
      data: response.status === 200 ? response.data : false,
      loading: readLoading
    }
  }

  const removeMany = async recordIds => {
    return recordIds.map(id => remove(id))
  }

  return {
    read,
    create,
    update,
    remove,
    removeMany
  }
}

export default useJsonBox
