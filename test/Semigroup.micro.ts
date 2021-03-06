import { assertThat } from 'mismatched'
import * as fc from 'fast-check'
import * as semigroup from '../src/Semigroup'

describe('Semigroup instances', () => {
  it('record semigroup', () => {
    type Cat = {
      name: string
      age: number
    }

    const catConcat = semigroup.record<Cat>({
      name: semigroup.string,
      age: semigroup.sum
    })

    fc.assert(
      fc.property(fc.string(), fc.integer(), (name, age) => {
        const cat: Cat = {
          name,
          age
        }

        assertThat(catConcat.concat(cat, cat)).is({ name: `${name} ${name}`, age: age + age })
      })
    )
  })
})
