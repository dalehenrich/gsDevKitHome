accessing
marryOff: child maxChildren: maxChildren
  | father mother eligible |
  child isMale
    ifTrue: [ 
      father := child.
      eligible := population
        select: { :person | (person.isFemale == true) & (person.isMarried == true) }.
      (eligible isEmpty or: [ 4 atRandom = 1 ])
        ifTrue: [ 
          mother := self createPerson: #'female'.
          self population add: mother ]
        ifFalse: [ mother := eligible atRandom ] ]
    ifFalse: [ 
      mother := child.
      eligible := population
        select: { :person | (person.isMale == true) & (person.isMarried == true) }.
      (eligible isEmpty or: [ 4 atRandom = 1 ])
        ifTrue: [ 
          father := self createPerson: #'male'.
          self population add: father ]
        ifFalse: [ father := eligible atRandom ] ].
  mother isMarried: true.
  father isMarried: true.
  ^ self createGeneration: father mother: mother maxChildren: maxChildren
