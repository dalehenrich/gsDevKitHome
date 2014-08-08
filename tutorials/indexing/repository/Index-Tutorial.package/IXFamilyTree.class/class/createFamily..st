as yet unclassified
createFamily: generations
  | adam eve stringFor |
  adam := IXPerson createMale.
  adam
    firstName: 'Adam';
    middleName: 'Oscar';
    lastName: 'Addams';
    createAntiques.
  adam tags add: #'adam'.
  stringFor := (self stringsFor: adam) atRandom.
  adam unicodeField: stringFor asUnicodeString.
  adam stringField: stringFor.
  eve := IXPerson createFemale.
  eve
    firstName: 'Eve';
    middleName: 'Penny';
    lastName: 'Addams';
    createAntiques.
  eve tags add: #'eve'.
  stringFor := (self stringsFor: eve) atRandom.
  eve unicodeField: stringFor asUnicodeString.
  eve stringField: stringFor.
  ^ self new
    adam: adam;
    eve: eve;
    createGenerations: generations;
    yourself
