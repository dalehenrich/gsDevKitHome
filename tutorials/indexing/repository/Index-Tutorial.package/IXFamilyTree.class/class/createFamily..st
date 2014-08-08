as yet unclassified
createFamily: generations
  | adam eve stringFor beginningOfTime |
  beginningOfTime := Date year: 1900 month: 1 day: 1.
  adam := IXPerson createMale.
  adam
    firstName: 'Adam';
    middleName: 'Oscar';
    lastName: 'Addams';
    birthday: beginningOfTime + 365 atRandom days;
    birthTime: (Time hour: 24 atRandom minute: 60 atRandom second: 60 atRandom);
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
    birthday: beginningOfTime + 365 atRandom days;
    birthTime: (Time hour: 24 atRandom minute: 60 atRandom second: 60 atRandom);
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