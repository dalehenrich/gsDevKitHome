as yet unclassified
firstNamesFor: aPerson
  ^ aPerson isMale
    ifTrue: [ #('Casey' 'Jessie' 'James' 'Martin' 'Nic' 'Brian' 'Adam' 'Charlie') ]
    ifFalse: [ #('Heather' 'Jessie' 'Sally' 'Penny' 'Casey' 'Janet' 'Eve' 'Evelyn') ]
