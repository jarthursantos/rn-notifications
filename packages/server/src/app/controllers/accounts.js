import { createAccountModule, findAccountModule } from '../../modules/accounts'

export async function handleFindAccount(req, res) {
  const { name } = req.params

  const account = await findAccountModule.execute(name)

  return res.json(account)
}

export async function handleCreateAccount(req, res) {
  const account = await createAccountModule.execute(req.body)

  return res.json(account)
}
