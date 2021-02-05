import createHttpError from 'http-errors'

export function validateBody(schema) {
  return async (req, _res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
      if (err instanceof ValidationError) {
        err.message = err.errors.join(', ')
      }

      throw new createHttpError.BadRequest(err.message || 'Unexpected error')
    }

    return next()
  }
}