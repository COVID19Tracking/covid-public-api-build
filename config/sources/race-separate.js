module.exports = {
  schema: 'RaceStatesSeparate',
  path: 'race/states-separate.{format}',
  tags: ['Racial data'],
  description: 'Racial data on states who separate race and ethnicity',
  sheetId: '1FnrtpGkm9tuWg8FLavkIHhJSx0Z-X5QJUfbkPhgL3JQ',
  worksheetId: '1837531601',
  fieldDefinitions: [
    {
      source: 'state',
      target: 'state',
      type: 'string',
      graphQlType: 'String',
      description: 'State abbreviation',
      nullable: false,
    },
    {
      source: 'name',
      target: 'stateName',
      type: 'string',
      graphQlType: 'String',
      description: 'State name',
      nullable: false,
    },
    {
      source: 'anyPosData',
      target: 'anyPosData',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description:
        'The state reports any positive case data by race/ethnicity.',
      nullable: true,
    },

    {
      source: 'posRaceData',
      target: 'posRaceData',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'posEthData',
      target: 'posEthData',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'anyDeathData',
      target: 'anyDeathData',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: 'The state reports any death data by race/ethnicity.',
      nullable: true,
    },
    {
      source: 'deathRaceData',
      target: 'deathRaceData',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'deathEthData',
      target: 'deathEthData',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'unknownRacePos',
      target: 'unknownRacePos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'unknownRaceDeath',
      target: 'unknownRaceDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'knownRacePos',
      target: 'knownRacePos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'knownRaceDeath',
      target: 'knownRaceDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'unknownEthPos',
      target: 'unknownEthPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'unknownEthDeath',
      target: 'unknownEthDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'knownEthPos',
      target: 'knownEthPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'knownEthDeath',
      target: 'knownEthDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'blackPositives',
      target: 'blackPositives',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'blackDeaths',
      target: 'blackDeaths',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'blackPctPop',
      target: 'blackPctPop',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'blackPctPos',
      target: 'blackPctPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'blackPctDeath',
      target: 'blackPctDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'blackPosDispFlag',
      target: 'blackPosDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'blackDeathDispFlag',
      target: 'blackDeathDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'blackPosCaution',
      target: 'blackPosCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'blackDeathCaution',
      target: 'blackDeathCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'blackANHPIPosNotes',
      target: 'blackANHPIPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'blackANHPIDeathNotes',
      target: 'blackANHPIDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'blackPosNotes',
      target: 'blackPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'blackDeathNotes',
      target: 'blackDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'blackSpecialCaseNotes',
      target: 'blackSpecialCaseNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'asianPositives',
      target: 'asianPositives',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'asianDeaths',
      target: 'asianDeaths',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'asianPctPop',
      target: 'asianPctPop',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'asianPctPos',
      target: 'asianPctPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'asianPctDeath',
      target: 'asianPctDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'asianPosDispFlag',
      target: 'asianPosDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'asianDeathDispFlag',
      target: 'asianDeathDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'asianPosCaution',
      target: 'asianPosCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'asianDeathCaution',
      target: 'asianDeathCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'asianANHPIPosNotes',
      target: 'asianANHPIPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'asianANHPIDeathNotes',
      target: 'asianANHPIDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'asianPosNotes',
      target: 'asianPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'asianDeathNotes',
      target: 'asianDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'asianSpecialCaseNotes',
      target: 'asianSpecialCaseNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'aianPositives',
      target: 'aianPositives',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'aianDeaths',
      target: 'aianDeaths',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'aianPctPop',
      target: 'aianPctPop',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'aianPctPos',
      target: 'aianPctPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'aianPctDeath',
      target: 'aianPctDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'aianPosDispFlag',
      target: 'aianPosDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'aianDeathDispFlag',
      target: 'aianDeathDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'aianPosCaution',
      target: 'aianPosCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'aianDeathCaution',
      target: 'aianDeathCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'aianANHPIPosNotes',
      target: 'aianANHPIPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'aianANHPIDeathNotes',
      target: 'aianANHPIDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'aianPosNotes',
      target: 'aianPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'aianDeathNotes',
      target: 'aianDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'aianSpecialCaseNotes',
      target: 'aianSpecialCaseNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiPositives',
      target: 'nhpiPositives',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiDeaths',
      target: 'nhpiDeaths',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiPctPop',
      target: 'nhpiPctPop',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiPctPos',
      target: 'nhpiPctPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiPctDeath',
      target: 'nhpiPctDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiPosDispFlag',
      target: 'nhpiPosDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiDeathDispFlag',
      target: 'nhpiDeathDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiPosCaution',
      target: 'nhpiPosCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiDeathCaution',
      target: 'nhpiDeathCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiANHPIPosNotes',
      target: 'nhpiANHPIPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiANHPIDeathNotes',
      target: 'nhpiANHPIDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiPosNotes',
      target: 'nhpiPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiDeathNotes',
      target: 'nhpiDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'nhpiSpecialCaseNotes',
      target: 'nhpiSpecialCaseNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'twoPositives',
      target: 'twoPositives',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'twoDeaths',
      target: 'twoDeaths',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'twoPctPop',
      target: 'twoPctPop',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'twoPctPos',
      target: 'twoPctPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'twoPctDeath',
      target: 'twoPctDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'twoPosDispFlag',
      target: 'twoPosDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'twoDeathDispFlag',
      target: 'twoDeathDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'twoPosCaution',
      target: 'twoPosCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'twoDeathCaution',
      target: 'twoDeathCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'twoANHPIPosNotes',
      target: 'twoANHPIPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'twoANHPIDeathNotes',
      target: 'twoANHPIDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'twoPosNotes',
      target: 'twoPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'twoDeathNotes',
      target: 'twoDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'twoSpecialCaseNotes',
      target: 'twoSpecialCaseNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'whitePositives',
      target: 'whitePositives',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'whiteDeaths',
      target: 'whiteDeaths',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'whitePctPop',
      target: 'whitePctPop',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'whitePctPos',
      target: 'whitePctPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'whitePctDeath',
      target: 'whitePctDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'whitePosDispFlag',
      target: 'whitePosDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'whiteDeathDispFlag',
      target: 'whiteDeathDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'whitePosCaution',
      target: 'whitePosCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'whiteDeathCaution',
      target: 'whiteDeathCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'whiteANHPIPosNotes',
      target: 'whiteANHPIPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'whiteANHPIDeathNotes',
      target: 'whiteANHPIDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'whitePosNotes',
      target: 'whitePosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'whiteDeathNotes',
      target: 'whiteDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'whiteSpecialCaseNotes',
      target: 'whiteSpecialCaseNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'otherPositives',
      target: 'otherPositives',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'otherDeaths',
      target: 'otherDeaths',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'otherPctPop',
      target: 'otherPctPop',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'otherPctPos',
      target: 'otherPctPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'otherPctDeath',
      target: 'otherPctDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'otherPosDispFlag',
      target: 'otherPosDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'otherDeathDispFlag',
      target: 'otherDeathDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'otherPosCaution',
      target: 'otherPosCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'otherDeathCaution',
      target: 'otherDeathCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'otherANHPIPosNotes',
      target: 'otherANHPIPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'otherANHPIDeathNotes',
      target: 'otherANHPIDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'otherPosNotes',
      target: 'otherPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'otherDeathNotes',
      target: 'otherDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'otherSpecialCaseNotes',
      target: 'otherSpecialCaseNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXPositives',
      target: 'latinXPositives',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXDeaths',
      target: 'latinXDeaths',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXPctPop',
      target: 'latinXPctPop',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXPctPos',
      target: 'latinXPctPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXPctDeath',
      target: 'latinXPctDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXPosDispFlag',
      target: 'latinXPosDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXDeathDispFlag',
      target: 'latinXDeathDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXPosCaution',
      target: 'latinXPosCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'latinXDeathCaution',
      target: 'latinXDeathCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'latinXANHPIPosNotes',
      target: 'latinXANHPIPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXANHPIDeathNotes',
      target: 'latinXANHPIDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXPosNotes',
      target: 'latinXPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXDeathNotes',
      target: 'latinXDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'latinXSpecialCaseNotes',
      target: 'latinXSpecialCaseNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicPositives',
      target: 'nonhispanicPositives',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicDeaths',
      target: 'nonhispanicDeaths',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicPctPop',
      target: 'nonhispanicPctPop',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicPctPos',
      target: 'nonhispanicPctPos',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicPctDeath',
      target: 'nonhispanicPctDeath',
      type: 'number',
      graphQlType: 'Int',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicPosDispFlag',
      target: 'nonhispanicPosDispFlag',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicDeathDispFlag',
      target: 'nonhispanicDeathDispFlag',
      type: 'number',
      type: 'boolean',
      convertSheetBoolean: true,
      graphQlType: 'Boolean',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicPosCaution',
      target: 'nonhispanicPosCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicDeathCaution',
      target: 'nonhispanicDeathCaution',
      type: 'boolean',
      graphQlType: 'Boolean',
      convertSheetBoolean: true,
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicANHPIPosNotes',
      target: 'nonhispanicANHPIPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicANHPIDeathNotes',
      target: 'nonhispanicANHPIDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicPosNotes',
      target: 'nonhispanicPosNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicDeathNotes',
      target: 'nonhispanicDeathNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
    {
      source: 'nonhispanicSpecialCaseNotes',
      target: 'nonhispanicSpecialCaseNotes',
      type: 'string',
      graphQlType: 'String',
      description: '',
      nullable: true,
    },
  ],
}
