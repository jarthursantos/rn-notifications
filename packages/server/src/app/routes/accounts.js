import { Router } from 'express'

import { createAccountSchema } from '../../modules/accounts'
import { notify } from '../../services/firebase'

import { handleFindAccount, handleCreateAccount } from '../controllers/accounts'
import { validateBody } from '../middlewares/validate-body'

const accountsRoutes = Router()

accountsRoutes.get('/:name', handleFindAccount)
accountsRoutes.post('/', validateBody(createAccountSchema), handleCreateAccount)

accountsRoutes.get('/:name/notify', async (req, res) => {
  await notify()

  return res.json()
})

export { accountsRoutes }
