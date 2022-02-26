import { assertThat } from 'mismatched'
import * as fc from 'fast-check'
import * as Eq from '../src/Equal'

describe('Equal instances', () => {
  it('record equality', () => {
    type Cat = {
      name: string
      lives: number
    }

    const CatEq = Eq.record({
      name: Eq.string,
      lives: Eq.number
    })

    fc.assert(
      fc.property(
        fc.tuple(fc.string(), fc.string(), fc.integer(), fc.integer()).filter(([n1, n2, a1, a2]) => n1.length !== n2.length && a1 !== a2),
        ([name1, name2, lives1, lives2]) => {
          const cat1: Cat = {
            name: name1,
            lives: lives1
          }

          const cat2: Cat = {
            name: name2,
            lives: lives2
          }

          assertThat(CatEq.equals(cat1, cat1)).is(true)
          assertThat(CatEq.equals(cat1, cat2)).is(false)
          assertThat(CatEq.equals(cat2, cat1)).is(false)
        }
      )
    )
  })
})
