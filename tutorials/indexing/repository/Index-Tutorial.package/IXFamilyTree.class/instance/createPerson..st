accessing
createPerson: gender
  | child tags stringFor |
  child := IXPerson createPerson
    gender: gender;
    yourself.
  child
    firstName: (self class firstNamesFor: child) atRandom;
    middleName: (self class middleNamesFor: child) atRandom;
    lastName: (self class lastNamesFor: child) atRandom.
  tags := self class tagsFor: child.
  tags size atRandom timesRepeat: [ child tags add: tags atRandom ].
  stringFor := (self class stringsFor: child) atRandom.
  child unicodeField: stringFor asUnicodeString.
  child stringField: stringFor.
  child createAntiques.
  ^ child
