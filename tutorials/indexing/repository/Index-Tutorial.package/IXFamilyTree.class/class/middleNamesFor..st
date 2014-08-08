as yet unclassified
middleNamesFor: aPerson
  "a comment"

  ^ aPerson isMale
    ifTrue: [ #('Henry' 'Kentland' 'Charles' 'Francis' 'Marion') ]
    ifFalse: [ #('Luella' 'Elizabeth' 'Mary' 'Eloise' 'Marion') ]
