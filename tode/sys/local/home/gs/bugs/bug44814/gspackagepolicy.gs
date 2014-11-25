category: 'Session Methods'
classmethod: GsPackagePolicy
_createTransientMethodsFor: aBehavior dictionaries: aSymbolList defaultCategory: defaultCategorySymbol transientMethodsSpec: transientMethodsSource
  "Compile and install transient methods in <aBehavior>. 
   Transient method source is specified as an array of strings by
     <transientMethodsSource>.
   If a persistent method already exists in <aBehavior> the method is installed
     in the category of the existing method. Otherwise, the method is installed
     in the given <defaultCategorySymbol."

  <primitive: 2001>
  | prot tmd |
  [ 
  prot := System _protectedMode.
  self _removeTransientMethodsFor: aBehavior.
  tmd := GsMethodDictionary new.
  transientMethodsSource
    do: [ :sourceString | | preCompiledMethod gsNMethod methodCategory |
      "Pre-compile method to get method selector"
      preCompiledMethod := aBehavior
        _primitiveCompileMethod: sourceString
        symbolList: aSymbolList
        category: defaultCategorySymbol
        oldLitVars: nil
        intoMethodDict: GsMethodDictionary new
        intoCategories: GsMethodDictionary new
        intoPragmas: nil
        environmentId: 0.
      methodCategory := defaultCategorySymbol. "set default"
      preCompiledMethod class == GsNMethod
        ifTrue: [
          "If a persistent method exists install the transient method in
           the same method category" 
          (aBehavior categoryOfSelector: preCompiledMethod selector)
            ifNotNil: [:existingCategory |  methodCategory := existingCategory ]].
    [ gsNMethod := aBehavior
        compileMethod: sourceString
        dictionaries: aSymbolList
        category: methodCategory
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
  "Install method dictionary <tmd> as the transient method dictionary for
   <aBehavior"

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
  "Remove all of the transient methods for aBehavior"

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
          (aBehavior categoryOfSelector: sel)
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
