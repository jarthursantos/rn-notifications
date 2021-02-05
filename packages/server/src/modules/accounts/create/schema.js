import * as Yup from 'yup'

export const createAccountSchema = Yup.object().shape({
  name: Yup.string("Account name need to be a 'String'").required('Account name has required')
})
