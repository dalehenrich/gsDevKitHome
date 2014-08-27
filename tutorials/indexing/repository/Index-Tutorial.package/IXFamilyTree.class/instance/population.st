accessing
population
  population
    ifNil: [ 
      population := IdentitySet new.
      false
        ifTrue: [ 
          "don't think I want indexes created EVERY time"
          population
            createEqualityIndexOn: 'isMarried' withLastElementClass: Boolean;
            createEqualityIndexOn: 'isMale' withLastElementClass: Boolean;
            createEqualityIndexOn: 'isFemale' withLastElementClass: Boolean ] ].
  ^ population
