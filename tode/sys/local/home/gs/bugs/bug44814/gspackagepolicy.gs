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
        ifTrue: [ aClass class ]
        ifFalse: [ aClass ].
      [ theClass
        compileMethod: sourceString
        dictionaries: aSymbolList
        category: categorySymbol
        intoMethodDict: tmd
        intoCategories: (theClass _baseCategorys: 0)
        intoPragmas: nil
        environmentId: 0 ] 
          on: CompileError
          do: [:ex | | errorString |
            errorString := GsNMethod 
                _sourceWithErrors: ex errorDetails 
                fromString: sourceString.
            self error: errorString ]].
  self _installTransientMethodsFor: aClass methodDictionary: tmd ]
    ensure: [ prot _leaveProtectedMode ]
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
  aClass _clearLookupCaches: 0.
  classes add: aClass
%
category: 'Session Methods'
classmethod: GsPackagePolicy
_removeTransientMethodsFor: aClass
  "enter protected mode"

  <primitive: 2001>
  | prot classes |
  [ 
  prot := System _protectedMode.
  classes := SessionTemps current
    at: #'UnicodeCompare_classes'
    ifAbsent: [ ^ false ].
  ((classes includes: aClass) not
    or: [ (aClass transientMethodDictForEnv: 0) isNil ])
    ifTrue: [ ^ false ].
  (aClass transientMethodDictForEnv: 0)
    keysDo: [ :sel | 
      (aClass __basicRemoveSelector: sel environmentId: 0)
        ifTrue: [ 
          (aClass categoryOfSelector: sel environmentId: 0)
            ifNotNil: [ :catSymbol | 
              | setOfSelectors |
              setOfSelectors := (aClass _baseCategorys: 0)
                at: catSymbol
                ifAbsent: [ IdentityBag new ].
              setOfSelectors remove: sel otherwise: nil ] ] ].
  aClass transientMethodDictForEnv: 0 put: nil.
  aClass _clearLookupCaches: 0.
  classes remove: aClass.
  ^ true ]
    ensure: [ prot _leaveProtectedMode ]
%
