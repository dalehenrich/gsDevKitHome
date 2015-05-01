! ------------------- Class definition for SelectorPathTermNscModificationTracker
doit
Object subclass: 'SelectorPathTermNscModificationTracker'
	instVarNames: #( modificationTracker)
	classVars: #()
	classInstVars: #()
	poolDictionaries: #()
	inDictionary: ''
	category: 'Selector-PathTerm-Example'
	options: #()

%

doit
SelectorPathTermNscModificationTracker comment: 
''
%
doit
SelectorPathTermNscModificationTracker category: 'Selector-PathTerm-Example'
%
! ------------------- Remove existing behavior from SelectorPathTermNscModificationTracker
doit
SelectorPathTermNscModificationTracker removeAllMethods.
SelectorPathTermNscModificationTracker class removeAllMethods.
%
set compile_env: 0
! ------------------- Class methods for SelectorPathTermNscModificationTracker
! ------------------- Instance methods for SelectorPathTermNscModificationTracker
category: 'as yet unclassified'
method: SelectorPathTermNscModificationTracker
adding: newObject to: trackedObject
  newObject _setModificationTrackingTo: self modificationTracker
%
category: 'accessing'
method: SelectorPathTermNscModificationTracker
modificationTracker

   ^modificationTracker
%
category: 'accessing'
method: SelectorPathTermNscModificationTracker
modificationTracker: anObject

   modificationTracker := anObject
%
category: 'as yet unclassified'
method: SelectorPathTermNscModificationTracker
removing: anObject from: trackedObject
  anObject _clearModificationTrackingTo: self modificationTracker
%
