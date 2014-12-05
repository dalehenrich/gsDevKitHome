category: 'Session Methods'
classmethod: GsPackagePolicy
_createTransientMethodsFor: aBehavior dictionaries: aSymbolList transientMethodsSpec: transientMethodsSource
  "Compile and install transient methods in <aBehavior>. 
   Transient method source is specified as an array of strings by
     <transientMethodsSource>.
   To avoid having to modify the persistent category diction, you should only override
     existing methods, so that the method category can be reused."

  <primitive: 2001>
  | prot tmd |
  [ 
  prot := System _protectedMode.
  self _removeTransientMethodsFor: aBehavior.
  tmd := GsMethodDictionary new.
  transientMethodsSource
    do: [ :sourceString | 
      | preCompiledMethod gsNMethod methodCategory |
      "Pre-compile method to get method selector"
      preCompiledMethod := aBehavior
        _primitiveCompileMethod: sourceString
        symbolList: aSymbolList
        category: #'xxyzzy'
        oldLitVars: nil
        intoMethodDict: GsMethodDictionary new
        intoCategories: GsMethodDictionary new
        intoPragmas: nil
        environmentId: 0.
      preCompiledMethod class == GsNMethod
        ifTrue: [  
          (aBehavior categoryOfSelector: preCompiledMethod selector)
            ifNil: [ self error: 'Transient method: ',  preCompiledMethod selector asString, ' must override a existing methods' ]
            ifNotNil: [ :existingCategory | 
              "Use the category of the existing persistent method"
              methodCategory := existingCategory ] ].
      [ 
      gsNMethod := aBehavior
        compileMethod: sourceString
        dictionaries: aSymbolList
        category: methodCategory
        intoMethodDict: tmd
        intoCategories: nil
        intoPragmas: nil
        environmentId: 0 ]
        on: CompileError
        do: [ :ex | 
          | errorString |
          errorString := GsNMethod
            _sourceWithErrors: ex errorDetails
            fromString: sourceString.
          self error: errorString ] ].
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
      SessionTemps current
        at: #'TransientSessionMethod_Behaviors'
        put: behaviors ].
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
  (aBehavior transientMethodDictForEnv: 0)
    ifNotNil: [ :tmd | 
      tmd
        keysDo: [ :sel | 
          (aBehavior persistentMethodAt: sel otherwise: nil)
            ifNil: [self error: 'Transient method: ',  sel asString, ' must override a existing methods' ] ].
      aBehavior transientMethodDictForEnv: 0 put: nil ].
  aBehavior _clearLookupCaches: 0.
  behaviors remove: aBehavior.
  ^ true ]
    ensure: [ prot _leaveProtectedMode ]
%
category: 'Session Methods'
classmethod: GsPackagePolicy
_removeAllTransientMethods
  (SessionTemps current
    at: #'TransientSessionMethod_Behaviors'
    ifAbsent: [ #() ]) copy do: [:behavior | self _removeTransientMethodsFor: behavior ].
%
