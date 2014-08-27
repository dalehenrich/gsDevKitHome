accessing
createGenerations: generations
  | siblings count |
  self population
    add: adam;
    add: eve.
  adam isMarried: true.
  eve isMarried: true.
  siblings := self
    createGeneration: adam
    mother: eve
    maxChildren: generations + 2.
  self addSiblingsToPopulation: siblings.
  count := generations.
  [ 
  count := count - 1.
  count > 0 ]
    whileTrue: [ 
      | offSpring |
      offSpring := IdentitySet new.
      siblings
        do: [ :child | offSpring addAll: (self marryOff: child maxChildren: count + 2) ].
      siblings := offSpring.
      self addSiblingsToPopulation: siblings ]