import { AccountsModel } from '../../../models/accounts'

export function createCreateAccountModule() {
  async function execute({ name }) {
    let account = await AccountsModel.findOne({ name })

    if (!account) {
      account = await AccountsModel.create({ name })
    }

    return account
  }
  
  return { execute }
}
