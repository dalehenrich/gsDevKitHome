category: 'Session Methods'
classmethod: GsPackagePolicy
_createTransientMethodsFor: aBehavior dictionaries: aSymbolList category: categorySymbol transentMethodsSpec: transentMethodsSource
  "enter protected mode"

  <primitive: 2001>
  | prot tmd |
  [ 
  prot := System _protectedMode.
  self _removeTransientMethodsFor: aBehavior.
  tmd := GsMethodDictionary new.
  transentMethodsSource
    do: [ :sourceString | 
    [ aBehavior
        compileMethod: sourceString
        dictionaries: aSymbolList
        category: categorySymbol
        intoMethodDict: tmd
        intoCategories: (aBehavior _baseCategorys: 0)
        intoPragmas: nil
        environmentId: 0 ] 
          on: CompileError
          do: [:ex | | errorString |
            errorString := GsNMethod 
                _sourceWithErrors: ex errorDetails 
                fromString: sourceString.
            self error: errorString ]].
  self _installTransientMethodsFor: aBehavior methodDictionary: tmd ]
    ensure: [ prot _leaveProtectedMode ]
%
category: 'Session Methods'
classmethod: GsPackagePolicy
_installTransientMethodsFor: aBehavior methodDictionary: tmd
  | classes thisClass |
  classes := SessionTemps current
    at: #'UnicodeCompare_classes'
    ifAbsent: [ 
      classes := IdentitySet new _setNoStubbing.
      SessionTemps current at: #'UnicodeCompare_classes' put: classes ].
  thisClass := aBehavior thisClass.
  ((classes includes: thisClass)
    or: [ (aBehavior transientMethodDictForEnv: 0) notNil ])
    ifTrue: [ 
      self
        error:
          'Transient method dictionary for class ' , aBehavior printString
            , ' already exists' ].
  aBehavior transientMethodDictForEnv: 0 put: tmd.
  aBehavior _clearLookupCaches: 0.
  classes add: thisClass
%
category: 'Session Methods'
classmethod: GsPackagePolicy
_removeTransientMethodsFor: aBehavior
  "enter protected mode"

  <primitive: 2001>
  | prot classes thisClass |
  [ 
  prot := System _protectedMode.
  classes := SessionTemps current
    at: #'UnicodeCompare_classes'
    ifAbsent: [ ^ false ].
  thisClass := aBehavior thisClass.
  ((classes includes: thisClass) not
    or: [ (aBehavior transientMethodDictForEnv: 0) isNil ])
    ifTrue: [ ^ false ].
  (aBehavior transientMethodDictForEnv: 0)
    keysDo: [ :sel | 
      (aBehavior __basicRemoveSelector: sel environmentId: 0)
        ifTrue: [ 
          (aBehavior categoryOfSelector: sel environmentId: 0)
            ifNotNil: [ :catSymbol | 
              | setOfSelectors |
              setOfSelectors := (aBehavior _baseCategorys: 0)
                at: catSymbol
                ifAbsent: [ IdentityBag new ].
              setOfSelectors remove: sel otherwise: nil ] ] ].
  aBehavior transientMethodDictForEnv: 0 put: nil.
  aBehavior _clearLookupCaches: 0.
  classes remove: thisClass.
  ^ true ]
    ensure: [ prot _leaveProtectedMode ]
%
