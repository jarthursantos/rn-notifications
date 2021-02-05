import createHttpError from 'http-errors'

import { AccountsModel } from '../../../models/accounts'
import { createShareURL } from '../../../services/firebase'

export function createFindAccountModule() {
  async function execute(name) {
    let account = await AccountsModel.findOne({ name })

    if (!account) {
      try {
        account = await AccountsModel.findById(name)
      } catch (error) {
        console.log(error)
      }
    }

    if (!account) {
      throw new createHttpError.NotFound(
        `Account with name '${name}' don't exists`
      )
    }

    const url = await createShareURL(`${process.env.APP_URL}/share?account=${account._id}`)

    if (!url) {
      throw createHttpError.InternalServerError('Error on dynamic link generation')
    }

    return { name: account.name, url }
  }

  return { execute }
}
