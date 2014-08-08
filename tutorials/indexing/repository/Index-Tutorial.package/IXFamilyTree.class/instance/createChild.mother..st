accessing
createChild: father mother: mother
  | child tags stringFor |
  child := self createChildInstance: father mother: mother.
  child
    firstName: (self class firstNamesFor: child) atRandom;
    middleName: (self class middleNamesFor: child) atRandom;
    lastName: father lastName.
  tags := self class tagsFor: child.
  tags size atRandom timesRepeat: [ child tags add: tags atRandom ].
  stringFor := (self class stringsFor: child) atRandom.
  child unicodeField: stringFor asUnicodeString.
  child stringField: stringFor.
  child createAntiques.
  ^ child
