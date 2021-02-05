import { Router } from 'express'

import { createAccountSchema } from '../../modules/accounts'

import { handleFindAccount, handleCreateAccount } from '../controllers/accounts'
import { validateBody } from '../middlewares/validate-body'

const accountsRoutes = Router()

accountsRoutes.get('/:name', handleFindAccount)
accountsRoutes.post('/', validateBody(createAccountSchema), handleCreateAccount)

export { accountsRoutes }
