import { Applicative } from './Applicative'
import { pipe } from './functions'
import { HKT, Kind } from './HKT'

export interface Compose<F extends HKT, G extends HKT> extends HKT {
  readonly type: Kind<F, this['R'], this['E'], Kind<G, this['R'], this['E'], this['A']>>
}

export interface ComposeF<F extends HKT, G extends HKT> extends HKT {
  readonly type: Kind<F, this['R'], this['E'], Kind<G, this['R'], this['E'], this['A']>>
}

export const getCompose = <F extends HKT, G extends HKT>(F: Applicative<F>, G: Applicative<G>): Applicative<Compose<F, G>> => ({
  of: a => F.of(G.of(a)),
  ap:
    <R2, E2, A, B>(fgab: Kind<F, R2, E2, Kind<G, R2, E2, (a: A) => B>>) =>
    <R, E>(fga: Kind<F, R, E, Kind<G, R, E, A>>) =>
      pipe(
        fgab,
        F.ap(
          pipe(
            fga,
            F.map(ga => f => G.ap(f)(ga))
          )
        )
      ),

  map: fg => F.map(ga => pipe(ga, G.map(fg)))
})
