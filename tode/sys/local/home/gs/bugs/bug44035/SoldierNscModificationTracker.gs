! ------------------- Class definition for SoldierNscModificationTracker
expectvalue /Class
doit
Object subclass: 'SoldierNscModificationTracker'
	instVarNames: #( selectorModificationTracker)
	classVars: #()
	classInstVars: #()
	poolDictionaries: #()
	inDictionary: ''
	category: 'Selector-PathTerm-Example'
	options: #()

%
expectvalue /Class
doit
SoldierNscModificationTracker comment: 
''
%
expectvalue /Class
doit
SoldierNscModificationTracker category: 'Selector-PathTerm-Example'
%
! ------------------- Remove existing behavior from SoldierNscModificationTracker
doit
SoldierNscModificationTracker removeAllMethods.
SoldierNscModificationTracker class removeAllMethods.
%
set compile_env: 0
! ------------------- Class methods for SoldierNscModificationTracker
! ------------------- Instance methods for SoldierNscModificationTracker
category: 'as yet unclassified'
method: SoldierNscModificationTracker
adding: newObject to: trackedObject
  "add a dependency to the soldier modification tracker, so that changes to the 
   object that affect the selector-based index can be tracked"

  newObject _setModificationTrackingTo: self selectorModificationTracker
%
category: 'as yet unclassified'
method: SoldierNscModificationTracker
removing: anObject from: trackedObject
  anObject _clearModificationTrackingTo: self selectorModificationTracker
%
category: 'Accessing'
method: SoldierNscModificationTracker
selectorModificationTracker
	^selectorModificationTracker
%
category: 'Updating'
method: SoldierNscModificationTracker
selectorModificationTracker: newValue
	selectorModificationTracker := newValue
%
