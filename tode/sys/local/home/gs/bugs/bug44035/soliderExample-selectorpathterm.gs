!=============== EXAMPLE 3 - SELECTOR PATH TERMS ========================

run
Object subclass: #Soldier
	instVarNames: #( name rank)
	classVars:  #( #Ranks )
	classInstVars: #()
	poolDictionaries: #()
	inDictionary: UserGlobals
%
run
Soldier compileAccessingMethodsFor: Soldier instVarNames.
%

classmethod: Soldier
initialize
| index |
Ranks := SymbolKeyValueDictionary new.
index := 1.
#( #Lieutenant #Captain #Major #Colonel #General )
	do: [:e | Ranks at: e put: index.
		index := index + 1 ].
%

run
Soldier initialize
%

classmethod: Soldier
rankOrderForRank: aSymbol
^ (Ranks at: aSymbol otherwise: 0)
%

method: Soldier
rankOrder
^self class rankOrderForRank: rank.
%

method: Soldier
printOn: aStream
aStream nextPutAll: self rank asString.
aStream nextPut: $ .
aStream nextPutAll: self name asString.
%

run
(Soldier new rank: #Lieutenant) rankOrder < (Soldier new rank: #Colonel) rankOrder
%

run
"create collection of soliders"
| myArmy |
myArmy := IdentityBag new.
myArmy 
	add: 	(Soldier new name: 'Patton'; rank: #General; yourself);
	add: 	(Soldier new name: 'Sanders'; rank: #Colonel; yourself);
	add: 	(Soldier new name: 'Houlihan'; rank: #Major; yourself);
	add: 	(Soldier new name: 'Vimes'; rank: #Captain; yourself);
	add: 	(Soldier new name: 'Dan'; rank: #Lieutenant; yourself);
	add: 	(Soldier new name: 'Pyle'; rank: #Private; yourself).
UserGlobals at: #myArmy put: myArmy.
^ myArmy
%

run
"query for senior officers"
(GsQuery fromString: 'each.#rankOrder > rank')
	bind: 'rank' to: (Soldier rankOrderForRank: #Captain);
	on: myArmy;
	queryResult
%

run
"create an index"
GsIndexSpec new
	equalityIndex: 'each.#rankOrder' lastElementClass: SmallInteger;
	createIndexesOn: myArmy.
%

run
"query for senior officers, now using index"
(GsQuery fromString: 'each.#rankOrder > rank')
	bind: 'rank' to: (Soldier rankOrderForRank: #Captain);
	on: myArmy;
	queryResult
%

! define method to allow Soldiers to change rank
method: Soldier
promoteTo: newRank
"Promote the receiver to the given rank."
| anArray |
anArray := self removeObjectFromBtrees.
rank := newRank.
self addObjectToBtreesWithValues: anArray

%

run
"test promotion, promote the Lieutenant to General"
(myArmy detect: [:each | each name = 'Dan'] ifNone: [nil]) 
	promoteTo: #General
%

run
"query for senior officers again"
(GsQuery fromString: 'each.#rankOrder > aRank')
	bind: 'aRank' to: (Soldier rankOrderForRank: #Captain);
	on: myArmy;
	queryResult
%

! query not using index, results should be the same.
run
myArmy select: [:ea | ea rankOrder > (Soldier rankOrderForRank: #Captain)]
%



