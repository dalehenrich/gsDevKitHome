! ------------------- Class definition for Soldier
expectvalue /Class
doit
Object subclass: 'Soldier'
	instVarNames: #( name rank)
	classVars: #( Ranks)
	classInstVars: #()
	poolDictionaries: #()
	inDictionary: ''
	category: 'Selector-PathTerm-Example'
	options: #()

%
expectvalue /Class
doit
Soldier comment: 
''
%
expectvalue /Class
doit
Soldier category: 'Selector-PathTerm-Example'
%
! ------------------- Remove existing behavior from Soldier
doit
Soldier removeAllMethods.
Soldier class removeAllMethods.
%
set compile_env: 0
! ------------------- Class methods for Soldier
category: 'as yet unclassified'
classmethod: Soldier
initialize
| index |
Ranks := SymbolKeyValueDictionary new.
index := 1.
#( #Lieutenant #Captain #Major #Colonel #General )
	do: [:e | Ranks at: e put: index.
		index := index + 1 ].
%
category: 'as yet unclassified'
classmethod: Soldier
rankOrderForRank: aSymbol
^ (Ranks at: aSymbol otherwise: 0)
%
! ------------------- Instance methods for Soldier
category: 'Accessing'
method: Soldier
name
	^name
%
category: 'Updating'
method: Soldier
name: newValue
	name := newValue
%
category: 'as yet unclassified'
method: Soldier
oldPromoteTo: newRank
"Promote the receiver to the given rank."
| anArray |
anArray := self removeObjectFromBtrees.
rank := newRank.
self addObjectToBtreesWithValues: anArray
%
category: 'as yet unclassified'
method: Soldier
printOn: aStream
aStream nextPutAll: self rank asString.
aStream nextPut: $ .
aStream nextPutAll: self name asString.
%
category: 'as yet unclassified'
method: Soldier
promoteTo: newRank
rank := newRank
%
category: 'Accessing'
method: Soldier
rank
	^rank
%
category: 'Updating'
method: Soldier
rank: newValue
	rank := newValue
%
category: 'as yet unclassified'
method: Soldier
rankOrder
^self class rankOrderForRank: rank.
%
