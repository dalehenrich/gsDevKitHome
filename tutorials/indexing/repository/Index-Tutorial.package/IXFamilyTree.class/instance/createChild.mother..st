accessing
createChild: father mother: mother
  | child tags stringFor baseDate |
  child := self createChildInstance: father mother: mother.
  baseDate := father birthday + ((father birthday - mother birthday) / 2).
  baseDate := baseDate
    + ((Collection randomForPicking integerBetween: 17 and: 30) * 365) days.
  child
    firstName: (self class firstNamesFor: child) atRandom;
    middleName: (self class middleNamesFor: child) atRandom;
    lastName: father lastName;
    birthday: baseDate;
    birthTime: (Time hour: 24 atRandom minute: 60 atRandom second: 60 atRandom).
  tags := self class tagsFor: child.
  tags size atRandom timesRepeat: [ child tags add: tags atRandom ].
  stringFor := (self class stringsFor: child) atRandom.
  child unicodeField: stringFor asUnicodeString.
  child stringField: stringFor.
  child createAntiques.
  ^ child