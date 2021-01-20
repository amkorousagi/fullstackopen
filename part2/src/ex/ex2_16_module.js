import axios from "axios"
const baseUrl = "http://3.14.3.74:3001/persons"

const getAll = async () => {
  let promise
  try {
    promise = await axios.get(baseUrl)
    console.log(promise.data)

    return promise.data
  } catch (err) {
    console.log(err.toString())
  }
}

const create = (newObject) => {
  return axios
    .post(baseUrl, newObject)
    .then((res) => res.data)
    .catch((err) => console.log(err.toString()))
}

const deleteObject = async (id) => {
  let promise
  promise = await axios.delete(baseUrl + "/" + id)
  console.log(promise)
  return promise.data
}
const update = async (newObject) => {
  let promise
  try {
    promise = await axios.put(baseUrl + "/" + newObject.id, newObject)
    console.log("update! ", promise)
    return promise.data
  } catch (err) {
    console.log(err.toString())
  }
}

export default { getAll, create, deleteObject, update }
