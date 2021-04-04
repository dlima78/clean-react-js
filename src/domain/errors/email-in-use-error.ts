export class EmailInUseError extends Error {
  constructor () {
    super('Email já cadastrodo.')
    this.name = 'EmailInUseError'
  }
}
