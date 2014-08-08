updating
addChild: aPerson
  aPerson isMale
    ifTrue: [ self sons add: aPerson ]
    ifFalse: [ self daughters add: aPerson ].
  numberOfChildren := self numberOfChildren + 1
