export class InvalidFieldError extends Error {
  constructor () {
    super('Campo invávlido')
    this.name = 'InvalidFieldError'
  }
}
