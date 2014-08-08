! ------------------- Class definition for IXAntique
doit
Object subclass: 'IXAntique'
  instVarNames: #( askingPrice label)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: UserGlobals
  options: #()

%

doit
IXAntique comment: 
''
%
doit
IXAntique category: 'Index-Family'
%
! ------------------- Remove existing behavior from IXAntique
doit
IXAntique removeAllMethods.
IXAntique class removeAllMethods.
%
! ------------------- Class methods for IXAntique
category: 'as yet unclassified'
set compile_env: 0
classmethod: IXAntique
antiqueLabels
  ^ #('chair' 'table' 'vase' 'coin' 'watch' 'quilt' 'painting' 'car')
%
category: 'as yet unclassified'
set compile_env: 0
classmethod: IXAntique
new
  ^ self basicNew initialize
%
! ------------------- Instance methods for IXAntique
category: 'as yet unclassified'
set compile_env: 0
method: IXAntique
askingPrice
  ^ askingPrice
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntique
asString
  ^ label , ' [$' , self askingPrice printString , ']'
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntique
initialize
  askingPrice := 100 atRandom.
  label := self class antiqueLabels atRandom
%
category: 'as yet unclassified'
set compile_env: 0
method: IXAntique
label
  ^ label
%
