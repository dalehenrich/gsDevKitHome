! ------------------- Class definition for IXPerson
doit
Object subclass: 'IXAbstractPerson'
  instVarNames: #( gender firstName middleName
                    lastName sons
                    daughters spouses numberOfChildren isMale
                    isFemale isMarried nilField tags
                    antiqueCollection unicodeField stringField)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: UserGlobals
  options: #()

%

doit
IXAbstractPerson subclass: 'IXPerson'
  instVarNames: #( father mother )
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: UserGlobals
  options: #()

%

doit
IXAbstractPerson subclass: 'IXFatherlessPerson'
  instVarNames: #( mother )
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: UserGlobals
  options: #()

%

doit
IXAbstractPerson subclass: 'IXMotherlessPerson'
  instVarNames: #( father )
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: UserGlobals
  options: #()

%

doit
IXAbstractPerson comment:
''
%
doit
IXAbstractPerson category: 'Index-Family'
%
! ------------------- Remove existing behavior from IXAbstractPerson
doit
IXAbstractPerson removeAllMethods.
IXAbstractPerson class removeAllMethods.
%

doit
IXMotherlessPerson comment:
''
%
doit
IXMotherlessPerson category: 'Index-Family'
%
! ------------------- Remove existing behavior from IXMotherlessPerson
doit
IXMotherlessPerson removeAllMethods.
IXMotherlessPerson class removeAllMethods.
%
doit
IXFatherlessPerson comment:
''
%
doit
IXFatherlessPerson category: 'Index-Family'
%
! ------------------- Remove existing behavior from IXFatherlessPerson
doit
IXFatherlessPerson removeAllMethods.
IXFatherlessPerson class removeAllMethods.
%


doit
IXPerson comment: 
''
%
doit
IXPerson category: 'Index-Family'
%
! ------------------- Remove existing behavior from IXPerson
doit
IXPerson removeAllMethods.
IXPerson class removeAllMethods.
%
! ------------------- Class methods for IXPerson
category: 'as yet unclassified'
set compile_env: 0
classmethod: IXAbstractPerson
createFemale
  ^ self new gender: #'female'
%
category: 'as yet unclassified'
set compile_env: 0
classmethod: IXAbstractPerson
createMale
  ^ self new gender: #'male'
%
category: 'as yet unclassified'
set compile_env: 0
classmethod: IXAbstractPerson
createPerson
  ^ self new gender: #(#'male' #'female') atRandom
%
category: 'as yet unclassified'
set compile_env: 0
classmethod: IXAbstractPerson
new
  ^ self basicNew initialize
%
! ------------------- Instance methods for IXAbstractPerson
category: 'updating'
set compile_env: 0
method: IXAbstractPerson
addChild: aPerson
  aPerson isMale
    ifTrue: [ self sons add: aPerson ]
    ifFalse: [ self daughters add: aPerson ].
  numberOfChildren := self numberOfChildren + 1
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
antiqueCollection
  ^ antiqueCollection
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
createAntiques
  10 atRandom timesRepeat: [ self antiqueCollection addAntique: IXAntique new ]
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
createPerson
  ^self new gender: #(#'male' #'female') atRandom
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
daughters
  daughters ifNil: [ daughters := Set new ].
  ^ daughters
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
father
  "no father by default"
  ^ nil
%
category: 'updating'
set compile_env: 0
method: IXAbstractPerson
father: aPerson
  "noop for fatherless persons"
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
firstName
  ^ firstName
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
firstName: aString
  firstName := aString
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
gender
  ^ gender
%
category: 'updating'
set compile_env: 0
method: IXAbstractPerson
gender: aSymbol
  "#male of #female"

  gender := aSymbol.
  isMale := gender == #'male'.
  isFemale := gender == #'female'.
  isMarried := false
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
initialize
  antiqueCollection := IXAntiqueCollection new
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
isFemale
  ^ gender == #'female'
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
isMale
  ^ gender == #'male'
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
isMarried
  ^ isMarried
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
isMarried: aBool
  isMarried := aBool
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
lastName
  ^ lastName
%
category: 'updating'
set compile_env: 0
method: IXAbstractPerson
lastName: newValue

   "Modify the value of the instance variable 'lastName'."
   lastName := newValue
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
middleName
  ^ middleName
%
category: 'updating'
set compile_env: 0
method: IXAbstractPerson
middleName: newValue

   "Modify the value of the instance variable 'middleName'."
   middleName := newValue
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
mother
  "No mother by default"
   ^ nil
%
category: 'updating'
set compile_env: 0
method: IXAbstractPerson
mother: aPerson
  "Noop for motherless person"
%
category: 'updating'
set compile_env: 0
method: IXAbstractPerson
numberOfChildren
  numberOfChildren ifNil: [ numberOfChildren := 0 ].
  ^ numberOfChildren
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAbstractPerson
printOn: aStream
  aStream
    nextPutAll: self firstName;
    space;
    nextPutAll: self middleName;
    space;
    nextPutAll: self lastName
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
sons
  sons ifNil: [ sons := Set new ].
  ^ sons
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
stringField
  ^ stringField
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
stringField: aString
  stringField := aString
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
tags
  tags ifNil: [ tags := Set new ].
  ^ tags
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
unicodeField
  ^ unicodeField
%
category: 'accessing'
set compile_env: 0
method: IXAbstractPerson
unicodeField: aUnicodeString
  unicodeField := aUnicodeString
%
category: 'accessing'
set compile_env: 0
method: IXPerson
mother

   "Return the value of the instance variable 'mother'."
   ^mother
%
category: 'updating'
set compile_env: 0
method: IXPerson
mother: aPerson
  mother := aPerson.
  mother addChild: self
%

category: 'as yet unclassified'
set compile_env: 0
method: IXPerson
father
  ^ father
%
category: 'updating'
set compile_env: 0
method: IXPerson
father: aPerson
  father := aPerson.
  father addChild: self
%

category: 'as yet unclassified'
set compile_env: 0
method: IXMotherlessPerson
father
  ^ father
%
category: 'updating'
set compile_env: 0
method: IXMotherlessPerson
father: aPerson
  father := aPerson.
  father addChild: self
%


category: 'accessing'
set compile_env: 0
method: IXFatherlessPerson
mother

   "Return the value of the instance variable 'mother'."
   ^mother
%
category: 'updating'
set compile_env: 0
method: IXFatherlessPerson
mother: aPerson
  mother := aPerson.
  mother addChild: self
%

