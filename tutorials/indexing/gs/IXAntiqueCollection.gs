! ------------------- Class definition for IXAntiqueCollection
doit
Magnitude subclass: 'IXAntiqueCollection'
  instVarNames: #( askingPrice contents)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: UserGlobals
  options: #()

%

doit
IXAntiqueCollection comment: 
''
%
doit
IXAntiqueCollection category: 'Index-Family'
%
! ------------------- Remove existing behavior from IXAntiqueCollection
doit
IXAntiqueCollection removeAllMethods.
IXAntiqueCollection class removeAllMethods.
%
! ------------------- Class methods for IXAntiqueCollection
category: 'as yet unclassified'
set compile_env: 0
classmethod: IXAntiqueCollection
new
  ^ self basicNew initialize
%
! ------------------- Instance methods for IXAntiqueCollection
category: 'as yet unclassified'
set compile_env: 0
method: IXAntiqueCollection
< anIXAntiqueCollection
  ^ self askingPrice < anIXAntiqueCollection askingPrice
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntiqueCollection
= anIXAntiqueCollection
  ^ self askingPrice = anIXAntiqueCollection askingPrice
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntiqueCollection
addAntique: anAntique
  askingPrice := askingPrice + anAntique askingPrice.
  contents add: anAntique
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntiqueCollection
askingPrice
  ^ askingPrice
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntiqueCollection
askingPrice: anInteger
  askingPrice := anInteger
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntiqueCollection
asString
  ^ super asString , '[$' , self askingPrice printString , ']'
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntiqueCollection
contents
  ^ contents
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntiqueCollection
hash
  ^ self askingPrice hash
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntiqueCollection
initialize
  askingPrice := 0.
  contents := Set new
%
