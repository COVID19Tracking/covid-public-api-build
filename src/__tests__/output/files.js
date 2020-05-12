const fileOutput = require('../../output/files')
const fs = require('fs-extra')
jest.mock('fs-extra')

const sampleData = [
  { item: 'A', date: 20200501 },
  { item: 'B', date: 20200501 },
  { item: 'C', date: 20200501 },
]

const sampleSource = {
  path: 'covid-api-testing.{format}',
}

const subDefinitions = [
  {
    key: 'test',
    path: 'test-sub-definition.{format}',
  },
]

describe('Output: Files', () => {
  it('writes files', () => {
    const jsonSpy = jest.spyOn(fs, 'outputJson')
    const fileSpy = jest.spyOn(fs, 'outputFile')
    fileOutput({ source: sampleSource, data: sampleData }, '/tmp')
    expect(jsonSpy).toHaveBeenCalled()
    expect(fileSpy).toHaveBeenCalled()
  })

  it('writes files for sub definitions', (done) => {
    const jsonSpy = jest.spyOn(fs, 'outputJson')
    const fileSpy = jest.spyOn(fs, 'outputFile')
    sampleSource.subDefinitions = subDefinitions
    fileOutput(
      {
        source: sampleSource,
        data: sampleData,
        subDefinitionOutput: {
          test: (data) => {
            expect(data[0].item).toBe('A')
            expect(jsonSpy).toHaveBeenCalled()
            expect(fileSpy).toHaveBeenCalled()
            delete sampleSource.subDefinitions
            done()
          },
        },
      },
      '/tmp'
    )
  })
})
