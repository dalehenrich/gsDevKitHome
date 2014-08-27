accessing
marryOff: child maxChildren: maxChildren
  | father mother birthday |
  birthday := child birthday
    + ((Collection randomForPicking integerBetween: -5 and: 5) * 365) days.
  child isMale
    ifTrue: [ 
      father := child.
      (self unmarriedFemales isEmpty or: [ 4 atRandom = 1 ])
        ifTrue: [ 
          mother := self createPerson: #'female'.
          mother
            birthday: birthday;
            birthTime:
                (Time hour: 24 atRandom minute: 60 atRandom second: 60 atRandom).
          self population add: mother ]
        ifFalse: [ mother := unmarriedFemales anyOne ] ]
    ifFalse: [ 
      mother := child.
      (self unmarriedMales isEmpty or: [ 4 atRandom = 1 ])
        ifTrue: [ 
          father := self createPerson: #'male'.
          father
            birthday: birthday;
            birthTime:
                (Time hour: 24 atRandom minute: 60 atRandom second: 60 atRandom).
          self population add: father ]
        ifFalse: [ father := unmarriedMales anyOne ] ].
  mother isMarried: true.
  father isMarried: true.
  unmarriedFemales remove: mother ifAbsent: [  ].
  unmarriedMales remove: father ifAbsent: [  ].
  ^ self createGeneration: father mother: mother maxChildren: maxChildren