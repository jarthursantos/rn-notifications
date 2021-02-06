import { api } from '../../../../services/api'

export default async function execute(req, res) {
  try {
    const { data } = await api.get(`accounts/${req.query.name}/notify`)

    res.json(data)
  } catch (error) {
    const { response: { status, data } } = error

    res.status(status).json(data)
  }
}
