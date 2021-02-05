import { createCreateAccountModule } from './create'
import { createFindAccountModule } from './find'

const createAccountModule = createCreateAccountModule()
const findAccountModule = createFindAccountModule()

export { createAccountModule, findAccountModule }
export * from './create/schema'
