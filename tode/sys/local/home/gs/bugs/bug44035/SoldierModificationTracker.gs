! ------------------- Class definition for SoldierModificationTracker
expectvalue /Class
doit
Object subclass: 'SoldierModificationTracker'
	instVarNames: #( trackedOffset selectorPathTerm)
	classVars: #()
	classInstVars: #()
	poolDictionaries: #()
	inDictionary: ''
	category: 'Selector-PathTerm-Example'
	options: #()

%
expectvalue /Class
doit
SoldierModificationTracker comment: 
''
%
expectvalue /Class
doit
SoldierModificationTracker category: 'Selector-PathTerm-Example'
%
! ------------------- Remove existing behavior from SoldierModificationTracker
doit
SoldierModificationTracker removeAllMethods.
SoldierModificationTracker class removeAllMethods.
%
set compile_env: 0
! ------------------- Class methods for SoldierModificationTracker
! ------------------- Instance methods for SoldierModificationTracker
category: 'as yet unclassified'
method: SoldierModificationTracker
aboutToModifyObject: anObject atOffset: anOffset to: newKey
  | pathTerm vals |
  anOffset == self trackedOffset
    ifFalse: [ ^ self ].
  pathTerm := self selectorPathTerm.
  vals := {}.
  1 to: pathTerm size do: [ :j | 
    | indexObj |
    " for each index utilizing this path term "
    indexObj := pathTerm at: j.
    vals
      add:
        {indexObj.
        (self updateIndex: indexObj forKeysWithValue: anObject toNewKey: newKey)} ].
  ^ vals
%
category: 'as yet unclassified'
method: SoldierModificationTracker
modifiedObject: anObject userData: ar
  | newKey indexObj vals |
  newKey := anObject rankOrder.
  indexObj := ar at: 1.
  vals := ar at: 2.
  vals do: [ :val | indexObj btreeAt: newKey put: anObject ]
%
category: 'Accessing'
method: SoldierModificationTracker
selectorPathTerm
	^selectorPathTerm
%
category: 'Updating'
method: SoldierModificationTracker
selectorPathTerm: newValue
	selectorPathTerm := newValue
%
category: 'Accessing'
method: SoldierModificationTracker
trackedOffset
	^trackedOffset
%
category: 'Updating'
method: SoldierModificationTracker
trackedOffset: newValue
	trackedOffset := newValue
%
category: 'as yet unclassified'
method: SoldierModificationTracker
updateIndex: indexObj forKeysWithValue: anObject toNewKey: newValue
  | aKey stream vals spec |
  " first we need to find all values that have aKey as the key "
  aKey := anObject
    perform:
      (selectorPathTerm name copyFrom: 2 to: selectorPathTerm name size) asSymbol.
  stream := indexObj asQueryEvaluator
    _findAllValuesGreaterThanKey: aKey
    andEquals: true.
  vals := {}.
  [ stream _btreeAtEnd not and: [ stream _peekKey _idxForSortEqualTo: aKey ] ]
    whileTrue: [ 
      aKey == stream _peekKey 
        ifTrue: [ 
          | peeked |
          "pick out the values at the given key that are identical to anObject"
          peeked := stream _peekValue.
          peeked == anObject
            ifTrue: [ vals add: peeked ] ].
      stream _btreeNext ].
  spec := {}.
  1 to: vals size do: [ :i | 
    "remove the entry for each old value "
    spec add: (vals at: i).
    indexObj btreeRemoveKey: aKey value: (vals at: i) ].
  ^ spec
%
