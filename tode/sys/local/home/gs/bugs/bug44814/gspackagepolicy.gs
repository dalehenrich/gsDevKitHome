




category: 'Session Methods'
classmethod: GsPackagePolicy
_createTransientMethodsFor: aClass dictionaries: aSymbolList category: categorySymbol transentMethodsSpec: transentMethodsSpec
  "enter protected mode"

  <primitive: 2001>
  | prot tmd |
  [
  prot := System _protectedMode.
  self _removeTransientMethodsFor: aClass.
  tmd := GsMethodDictionary new.
  transentMethodsSpec
    do: [ :transientSpec | 
      | isMeta sourceString theClass |
      isMeta := transientSpec at: 1.
      sourceString := transientSpec at: 2.
      theClass := isMeta
        ifTrue: [ aClass class ].
      theClass
        compileMethod: sourceString
        dictionaries: aSymbolList
        category: categorySymbol
        intoMethodDict: tmd
        intoCategories: nil
        intoPragmas: nil
        environmentId: 0 ].
  self _installTransientMethodsFor: aClass methodDictionary: tmd ]
    ensure: [prot  _leaveProtectedMode ].
%
category: 'Session Methods'
classmethod: GsPackagePolicy
_installTransientMethodsFor: aClass methodDictionary: tmd
  | classes |
  classes := SessionTemps current
    at: #'UnicodeCompare_classes'
    ifAbsent: [ 
      classes := Array new _setNoStubbing.
      SessionTemps current at: #'UnicodeCompare_classes' put: classes ].
  ((classes includes: aClass)
    or: [ (aClass transientMethodDictForEnv: 0) notNil ])
    ifTrue: [ 
      self
        error:
          'Transient method dictionary for class ' , aClass printString
            , ' already exists' ].
  aClass transientMethodDictForEnv: 0 put: tmd.
  classes add: aClass
%
category: 'Session Methods'
classmethod: GsPackagePolicy
_removeTransientMethodsFor: aClass
  | classes |
  classes := SessionTemps current
    at: #'UnicodeCompare_classes'
    ifAbsent: [ ^ false ].
  ((classes includes: aClass) not
    or: [ (aClass transientMethodDictForEnv: 0) isNil ])
    ifTrue: [ ^ false ].
  aClass transientMethodDictForEnv: 0 put: nil.
  classes remove: aClass.
  ^ true
%
