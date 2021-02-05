import createHttpError from 'http-errors'

import { AccountsModel } from '../../../models/accounts'

export function createFindAccountModule() {
  async function execute(name) {
    const account = await AccountsModel.findOne({ name })

    if (!account) {
      throw new createHttpError.NotFound(
        `Account with name '${name}' don't exists`
      )
    }

    return { name: account.name, url: `${process.env.APP_URL}/share?account=${account._id}` }
  }

  return { execute }
}
