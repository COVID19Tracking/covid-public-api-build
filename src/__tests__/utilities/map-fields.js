const mapFields = require('../../utilities/map-fields')

const fieldDefinition = [
  {
    source: 'Letter A',
    target: 'letterA',
    nullable: false,
  },
  {
    source: 'Just number',
    target: 'justNumber',
    type: 'integer',
    nullable: true,
  },
  {
    source: 'Letter B',
    target: 'letterB',
    nullable: true,
    format: (value) => {
      return `${value} and more`
    },
  },
  {
    source: 'Get Letter A',
    target: 'getLetterA',
    nullable: true,
    sourceFunction: (item) => item.letterA,
  },
]

describe('Field mapping', () => {
  it('maps fields', () => {
    expect(
      mapFields(fieldDefinition, {
        'Letter A': 'a',
      }).letterA
    ).toBe('a')
  })

  it('maps fields', () => {
    expect(
      mapFields(fieldDefinition, {
        'Letter A': 'a',
        'Letter B': 'b',
      }).letterB
    ).toBe('b and more')
  })

  it('maps fields', () => {
    expect(
      mapFields(fieldDefinition, {
        'Letter B': 'b',
      })
    ).toBe(false)
  })

  it('formats integer fields', () => {
    expect(
      mapFields(fieldDefinition, {
        'Letter A': 'a',
        'Just number': '1034',
      }).justNumber
    ).toBe(1034)
  })

  it('formats source inport functions', () => {
    expect(
      mapFields(fieldDefinition, {
        'Letter A': 'abc',
      }).getLetterA
    ).toBe('abc')
  })
})
