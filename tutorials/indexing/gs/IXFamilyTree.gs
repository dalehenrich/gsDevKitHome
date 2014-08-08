run
Object subclass: 'IXFamilyTree'
  instVarNames: #( adam eve population)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: UserGlobals
  options: #()

%
run
IXFamilyTree subclass: 'IXMutantFamilyTree'
  instVarNames: #( )
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: UserGlobals
  options: #()

%
category: 'as yet unclassified'
classmethod: IXFamilyTree
createFamily
  ^ self createFamily: (GSTestCase random integerBetween: 2 and: 4)
%
category: 'as yet unclassified'
classmethod: IXFamilyTree
createFamily: generations
  | adam eve stringFor |
  adam := IXPerson createMale.
  adam
    firstName: 'Adam';
    middleName: 'Oscar';
    lastName: 'Addams';
    createAntiques.
  adam tags add: #'adam'.
  stringFor := (self stringsFor: adam) atRandom.
  adam unicodeField: stringFor asUnicodeString.
  adam stringField: stringFor.
  eve := IXPerson createFemale.
  eve
    firstName: 'Eve';
    middleName: 'Penny';
    lastName: 'Addams';
    createAntiques.
  eve tags add: #'eve'.
  stringFor := (self stringsFor: eve) atRandom.
  eve unicodeField: stringFor asUnicodeString.
  eve stringField: stringFor.
  ^ self new
    adam: adam;
    eve: eve;
    createGenerations: generations;
    yourself
%
category: 'as yet unclassified'
classmethod: IXFamilyTree
firstNamesFor: aPerson
  ^ aPerson isMale
    ifTrue: [ #('Casey' 'Jessie' 'James' 'Martin' 'Nic' 'Brian' 'Adam' 'Charlie') ]
    ifFalse: [ #('Heather' 'Jessie' 'Sally' 'Penny' 'Casey' 'Janet' 'Eve' 'Evelyn') ]
%
category: 'as yet unclassified'
classmethod: IXFamilyTree
lastNamesFor: aPerson
  ^ #('James' 'Martin' 'Sally' 'Henrichs' 'Brady' 'Partridge' 'Bunker')
%
category: 'as yet unclassified'
fileformat UTF8
classmethod: IXFamilyTree
middleNamesFor: aPerson
  "a comment"

  ^ aPerson isMale
    ifTrue: [ #('Henry' 'Kentland' 'Charles' 'Francis' 'Marion') ]
    ifFalse: [ #('Luella' 'Elizabeth' 'Mary' 'Eloise' 'Marion') ]
%
category: 'as yet unclassified'
classmethod: IXFamilyTree
stringsFor: aPerson
  "Samples of strings for which Unicode collating sequence differs between collators"

  ^ {'Monday'.
  '𣎏'.	"Vietnamese (quad byte)"
  'Chủ nhật'.	"Vietnamese"
  'tháng một'.	"Vietnamese"
  'monday'.
  'flüße'.	"German"
  'Flüße'.	"German"
  'Δευτέρα'.	"Greek (double byte)"
  'Κυριακή'	"Greek(double byte)"}
%
category: 'as yet unclassified'
classmethod: IXFamilyTree
tagsFor: aPerson
  ^ #('chess' 'disc golf' 'bowling' 'knitting' 'soccer' 'reading' 'cooking' 'magic')
%
category: 'accessing'
method: IXFamilyTree
adam

   "Return the value of the instance variable 'adam'."
   ^adam
%
category: 'accessing'
method: IXFamilyTree
createChild: father mother: mother
  | child tags stringFor |
  child := self createChildInstance: father mother: mother.
  child
    firstName: (self class firstNamesFor: child) atRandom;
    middleName: (self class middleNamesFor: child) atRandom;
    lastName: father lastName.
  tags := self class tagsFor: child.
  tags size atRandom timesRepeat: [ child tags add: tags atRandom ].
  stringFor := (self class stringsFor: child) atRandom.
  child unicodeField: stringFor asUnicodeString.
  child stringField: stringFor.
  child createAntiques.
  ^ child
%
category: 'accessing'
method: IXFamilyTree
createGeneration: father mother: mother maxChildren: maxChildren
  | siblings min |
  min := maxChildren - 3 max: 1.
  siblings := Array new.
(GSTestCase random integerBetween: min and: maxChildren)
  timesRepeat: [ siblings add: (self createChild: father mother: mother) ].
  ^ siblings
%
category: 'accessing'
method: IXFamilyTree
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
  self population addAll: siblings.
  count := generations.
  [ 
  count := count - 1.
  count > 0 ]
    whileTrue: [ 
      | offSpring |
      offSpring := Array new.
      siblings
        do: [ :child | offSpring := offSpring , (self marryOff: child maxChildren: count + 2) ].
      siblings := offSpring.
      self population addAll: siblings ]
%
category: 'accessing'
method: IXFamilyTree
createPerson: gender
  | child tags stringFor |
  child := IXPerson createPerson
    gender: gender;
    yourself.
  child
    firstName: (self class firstNamesFor: child) atRandom;
    middleName: (self class middleNamesFor: child) atRandom;
    lastName: (self class lastNamesFor: child) atRandom.
  tags := self class tagsFor: child.
  tags size atRandom timesRepeat: [ child tags add: tags atRandom ].
  stringFor := (self class stringsFor: child) atRandom.
  child unicodeField: stringFor asUnicodeString.
  child stringField: stringFor.
  child createAntiques.
  ^ child
%
category: 'accessing'
method: IXFamilyTree
eve

   "Return the value of the instance variable 'eve'."
   ^eve
%
category: 'accessing'
method: IXFamilyTree
marryOff: child maxChildren: maxChildren
  | father mother eligible |
  child isMale
    ifTrue: [ 
      father := child.
      eligible := population
        select: { :person | (person.isFemale == true) & (person.isMarried == true) }.
      (eligible isEmpty or: [ 4 atRandom = 1 ])
        ifTrue: [ 
          mother := self createPerson: #'female'.
          self population add: mother ]
        ifFalse: [ mother := eligible atRandom ] ]
    ifFalse: [ 
      mother := child.
      eligible := population
        select: { :person | (person.isMale == true) & (person.isMarried == true) }.
      (eligible isEmpty or: [ 4 atRandom = 1 ])
        ifTrue: [ 
          father := self createPerson: #'male'.
          self population add: father ]
        ifFalse: [ father := eligible atRandom ] ].
  mother isMarried: true.
  father isMarried: true.
  ^ self createGeneration: father mother: mother maxChildren: maxChildren
%
category: 'accessing'
method: IXFamilyTree
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
%
category: 'Updating'
method: IXFamilyTree
population: newValue

   "Modify the value of the instance variable 'population'."
   population := newValue
%
category: 'updating'
method: IXFamilyTree
adam: newValue

   "Modify the value of the instance variable 'adam'."
   adam := newValue
%
category: 'updating'
method: IXFamilyTree
eve: newValue

   "Modify the value of the instance variable 'eve'."
   eve := newValue
%
category: 'accessing'
method: IXFamilyTree
createChildInstance: father mother: mother
  ^ IXPerson createPerson
    father: father;
    mother: mother;
    yourself
%
category: 'accessing'
method: IXMutantFamilyTree
createChildInstance: father mother: mother
  "10% chance to be fatherless or motherless"

  | personClass |
  personClass := {IXPerson.
  IXPerson.
  IXPerson.
  IXPerson.
  IXPerson.
  IXPerson.
  IXPerson.
  IXPerson.
  IXFatherlessPerson.
  IXMotherlessPerson} atRandom.
  ^ personClass createPerson
    father: father;
    mother: mother;
    yourself
%
