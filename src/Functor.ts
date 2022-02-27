import { HKT, Kind, Typeclass } from './HKT'

export interface Functor<F extends HKT> extends Typeclass<F> {
  readonly map: <A, B>(f: (a: A) => B) => <R, E>(fa: Kind<F, R, E, A>) => Kind<F, R, E, B>
}
