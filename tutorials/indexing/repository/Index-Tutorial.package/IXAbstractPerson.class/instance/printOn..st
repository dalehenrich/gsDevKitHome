as yet unclassified
printOn: aStream
  aStream
    nextPutAll: self firstName;
    space;
    nextPutAll: self middleName;
    space;
    nextPutAll: self lastName
