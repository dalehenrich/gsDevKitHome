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
  | behaviors |
  behaviors := SessionTemps current
    at: #'TransientSessionMethod_Behaviors'
    ifAbsent: [ 
      behaviors := IdentitySet new _setNoStubbing.
      SessionTemps current at: #'TransientSessionMethod_Behaviors' put: behaviors ].
  ((behaviors includes: aBehavior)
    or: [ (aBehavior transientMethodDictForEnv: 0) notNil ])
    ifTrue: [ 
      self
        error:
          'Transient method dictionary for class ' , aBehavior printString
            , ' already exists' ].
  aBehavior transientMethodDictForEnv: 0 put: tmd.
  aBehavior _clearLookupCaches: 0.
  behaviors add: aBehavior
%
category: 'Session Methods'
classmethod: GsPackagePolicy
_removeTransientMethodsFor: aBehavior
  "enter protected mode"

  <primitive: 2001>
  | prot behaviors |
  [ 
  prot := System _protectedMode.
  behaviors := SessionTemps current
    at: #'TransientSessionMethod_Behaviors'
    ifAbsent: [ ^ false ].
  ((behaviors includes: aBehavior) not
    or: [ (aBehavior transientMethodDictForEnv: 0) isNil ])
    ifTrue: [ ^ false ].
  (aBehavior transientMethodDictForEnv: 0) ifNotNil: [:tmd |
    tmd keysDo: [ :sel | 
      (aBehavior persistentMethodAt: sel otherwise: nil)
        ifNil: [ 
          (aBehavior categoryOfSelector: sel environmentId: 0)
            ifNotNil: [ :catSymbol | 
              | setOfSelectors |
              setOfSelectors := (aBehavior _baseCategorys: 0)
                at: catSymbol
                ifAbsent: [ IdentityBag new ].
              setOfSelectors remove: sel otherwise: nil ] ] ].
      aBehavior transientMethodDictForEnv: 0 put: nil ].
  aBehavior _clearLookupCaches: 0.
  behaviors remove: aBehavior.
  ^ true ]
    ensure: [ prot _leaveProtectedMode ]
%
