const fields = [
  'state',
  'name',
  'unknownRacePos',
  'unknownRaceDeath',
  'knownRacePos',
  'knownRaceDeath',
  'unknownEthPos',
  'unknownEthDeath',
  'knownEthPos',
  'knownEthDeath',
  'blackPositives',
  'blackDeaths',
  'blackPctPop',
  'blackPctPos',
  'blackPctDeath',
  'blackPosDispFlag',
  'blackDeathDispFlag',
  'blackPosCaution',
  'blackDeathCaution',
  'blackANHPIPosNotes',
  'blackANHPIDeathNotes',
  'blackPosNotes',
  'blackDeathNotes',
  'blackSpecialCaseNotes',
  'blackPositives',
  'blackDeaths',
  'blackPctPop',
  'blackPctPos',
  'blackPctDeath',
  'blackPosDispFlag',
  'blackDeathDispFlag',
  'blackPosCaution',
  'blackDeathCaution',
  'blackANHPIPosNotes',
  'blackANHPIDeathNotes',
  'blackPosNotes',
  'blackDeathNotes',
  'blackSpecialCaseNotes',
  'asianPositives',
  'asianDeaths',
  'asianPctPop',
  'asianPctPos',
  'asianPctDeath',
  'asianPosDispFlag',
  'asianDeathDispFlag',
  'asianPosCaution',
  'asianDeathCaution',
  'asianANHPIPosNotes',
  'asianANHPIDeathNotes',
  'asianPosNotes',
  'asianDeathNotes',
  'asianSpecialCaseNotes',
  'aianPositives',
  'aianDeaths',
  'aianPctPop',
  'aianPctPos',
  'aianPctDeath',
  'aianPosDispFlag',
  'aianDeathDispFlag',
  'aianPosCaution',
  'aianDeathCaution',
  'aianANHPIPosNotes',
  'aianANHPIDeathNotes',
  'aianPosNotes',
  'aianDeathNotes',
  'aianSpecialCaseNotes',
  'nhpiPositives',
  'nhpiDeaths',
  'nhpiPctPop',
  'nhpiPctPos',
  'nhpiPctDeath',
  'nhpiPosDispFlag',
  'nhpiDeathDispFlag',
  'nhpiPosCaution',
  'nhpiDeathCaution',
  'nhpiANHPIPosNotes',
  'nhpiANHPIDeathNotes',
  'nhpiPosNotes',
  'nhpiDeathNotes',
  'nhpiSpecialCaseNotes',
  'twoPositives',
  'twoDeaths',
  'twoPctPop',
  'twoPctPos',
  'twoPctDeath',
  'twoPosDispFlag',
  'twoDeathDispFlag',
  'twoPosCaution',
  'twoDeathCaution',
  'twoANHPIPosNotes',
  'twoANHPIDeathNotes',
  'twoPosNotes',
  'twoDeathNotes',
  'twoSpecialCaseNotes',
  'whitePositives',
  'whiteDeaths',
  'whitePctPop',
  'whitePctPos',
  'whitePctDeath',
  'whitePosDispFlag',
  'whiteDeathDispFlag',
  'whitePosCaution',
  'whiteDeathCaution',
  'whiteANHPIPosNotes',
  'whiteANHPIDeathNotes',
  'whitePosNotes',
  'whiteDeathNotes',
  'whiteSpecialCaseNotes',
  'otherPositives',
  'otherDeaths',
  'otherPctPop',
  'otherPctPos',
  'otherPctDeath',
  'otherPosDispFlag',
  'otherDeathDispFlag',
  'otherPosCaution',
  'otherDeathCaution',
  'otherANHPIPosNotes',
  'otherANHPIDeathNotes',
  'otherPosNotes',
  'otherDeathNotes',
  'otherSpecialCaseNotes',
  'latinXPositives',
  'latinXDeaths',
  'latinXPctPop',
  'latinXPctPos',
  'latinXPctDeath',
  'latinXPosDispFlag',
  'latinXDeathDispFlag',
  'latinXPosCaution',
  'latinXDeathCaution',
  'latinXANHPIPosNotes',
  'latinXANHPIDeathNotes',
  'latinXPosNotes',
  'latinXDeathNotes',
  'latinXSpecialCaseNotes',
  'nonhispanicPositives',
  'nonhispanicDeaths',
  'nonhispanicPctPop',
  'nonhispanicPctPos',
  'nonhispanicPctDeath',
  'nonhispanicPosDispFlag',
  'nonhispanicDeathDispFlag',
  'nonhispanicPosCaution',
  'nonhispanicDeathCaution',
  'nonhispanicANHPIPosNotes',
  'nonhispanicANHPIDeathNotes',
  'nonhispanicPosNotes',
  'nonhispanicDeathNotes',
  'nonhispanicSpecialCaseNotes',
]
const r = []
const fi = []
const getF = (f) => {
  if (f.search('Pct') > -1) {
    return 'number'
  }
  if (f.search('Pos') > -1) {
    return 'number'
  }
  if (f.search('Death') > -1) {
    return 'number'
  }
  if (f.search('Flag') > -1) {
    return 'boolean'
  }
  if (f.search('Caution') > -1) {
    return 'boolean'
  }
  return 'string'
}

const getG = (f) => {
  if (f.search('Pct') > -1) {
    return 'Int'
  }
  if (f.search('Pos') > -1) {
    return 'Int'
  }
  if (f.search('Death') > -1) {
    return 'Int'
  }
  if (f.search('Flag') > -1) {
    return 'Boolean'
  }
  if (f.search('Caution') > -1) {
    return 'Boolean'
  }
  return 'String'
}

fields.forEach((field) => {
  if (fi.indexOf(field) > -1) {
    console.log(field)
    return
  }
  r.push({
    source: field,
    target: field,
    type: getF(field),
    graphQlType: getG(field),
    description: '',
    nullable: true,
  })
  fi.push(field)
})

//console.log(JSON.stringify(r))
