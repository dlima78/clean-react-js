import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { makeLocalStorageAdapterFactory } from '../../cache/local-storage-adapter-factory'

export const makeUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapterFactory())
}
