import { AccountsModel } from '../../../models/accounts'

export function createCreateAccountModule() {
  async function execute({ name }) {
    let account = await AccountsModel.findOne({ name })

    if (!account) {
      account = await AccountsModel.create({ name })
    }

    return { name: account.name, url: `${process.env.APP_URL}/share?account=${account._id}` }
  }

  return { execute }
}
