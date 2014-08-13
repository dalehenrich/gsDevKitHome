accessing
addSiblingsToPopulation: siblings
  siblings
    do: [ :sib | 
      self population add: sib.
      sib isMale
        ifTrue: [ 
          sib isMarried not
            ifTrue: [ self unmarriedMales add: sib ] ]
        ifFalse: [ 
          sib isMarried not
            ifTrue: [ self unmarriedFemales add: sib ] ] ]