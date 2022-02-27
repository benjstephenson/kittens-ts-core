import { Functor } from './Functor'
import { HKT, Kind } from './HKT'
import { Monad } from './Monad'

export interface Apply<F extends HKT> extends Functor<F> {
  readonly ap: <R2, E2, A, B>(fab: Kind<F, R2, E2, (a: A) => B>) => <R, E>(fa: Kind<F, R, E, A>) => Kind<F, R & R2, E | E2, B>
}

export const getApply = <F extends HKT>(F: Monad<F>): Apply<F> => ({
  map: F.map,
  ap: F.ap
})
