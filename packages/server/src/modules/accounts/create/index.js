import { AccountsModel } from '../../../models/accounts'
import { createShareURL } from '../../../services/firebase'

export function createCreateAccountModule() {
  async function execute({ name }) {
    let account = await AccountsModel.findOne({ name })

    if (!account) {
      account = await AccountsModel.create({ name })
    }

    const url = await createShareURL(`${process.env.APP_URL}/share?account=${account._id}`)

    if (!url) {
      throw createHttpError.InternalServerError('Error on dynamic link generation')
    }

    return { name: account.name, url }
  }

  return { execute }
}
