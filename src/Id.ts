import { HKT } from './HKT'
import { Monad } from './Monad'

export interface Id<A> {
  (a: A): A
}

export interface IdF extends HKT {
  readonly type: this['A']
}

export const identityM: Monad<IdF> = {
  ap: fab => fab,
  of: a => a,
  map: f => f,
  flatMap: f => f
}
