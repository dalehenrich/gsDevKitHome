! ------------------- Class definition for SelectorPathTermModificationTracker
doit
Object subclass: 'SelectorPathTermModificationTracker'
	instVarNames: #( trackedOffset selectorPathTerm selector)
	classVars: #()
	classInstVars: #()
	poolDictionaries: #()
	inDictionary: ''
	category: 'Selector-PathTerm-Example'
	options: #()

%

doit
SelectorPathTermModificationTracker comment: 
''
%
doit
SelectorPathTermModificationTracker category: 'Selector-PathTerm-Example'
%
! ------------------- Remove existing behavior from SelectorPathTermModificationTracker
doit
SelectorPathTermModificationTracker removeAllMethods.
SelectorPathTermModificationTracker class removeAllMethods.
%
set compile_env: 0
! ------------------- Class methods for SelectorPathTermModificationTracker
! ------------------- Instance methods for SelectorPathTermModificationTracker
category: 'as yet unclassified'
method: SelectorPathTermModificationTracker
btreeAt: anObject put: ar
  | newKey indexObj vals |
  newKey := anObject perform: self selector.
  indexObj := ar at: 1.
  vals := ar at: 2.
  vals do: [ :val | indexObj btreeAt: newKey put: anObject ]
%
category: 'as yet unclassified'
method: SelectorPathTermModificationTracker
modifyingObject: anObject atOffset: anOffset to: newKey
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
category: 'accessing'
method: SelectorPathTermModificationTracker
selector
  selector
    ifNil: [ 
      selector := (selectorPathTerm name copyFrom: 2 to: selectorPathTerm name size)
        asSymbol ].
  ^ selector
%
category: 'accessing'
method: SelectorPathTermModificationTracker
selector: anObject

   selector := anObject
%
category: 'Accessing'
method: SelectorPathTermModificationTracker
selectorPathTerm
	^selectorPathTerm
%
category: 'Updating'
method: SelectorPathTermModificationTracker
selectorPathTerm: newValue
	selectorPathTerm := newValue
%
category: 'Accessing'
method: SelectorPathTermModificationTracker
trackedOffset
	^trackedOffset
%
category: 'Updating'
method: SelectorPathTermModificationTracker
trackedOffset: newValue
	trackedOffset := newValue
%
category: 'as yet unclassified'
method: SelectorPathTermModificationTracker
updateIndex: indexObj forKeysWithValue: anObject toNewKey: newValue
  | aKey stream vals spec |
  " first we need to find all values that have aKey as the key "
  aKey := anObject perform: self selector.
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
