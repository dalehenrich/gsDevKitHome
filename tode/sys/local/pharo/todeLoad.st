[ 
  "Tests pharo todeLoad.st"
  | gs_home |
  gs_home := Smalltalk os environment at: 'GS_HOME'.
  false ifTrue: [
    Smalltalk at: #MCGitHubRepository ifPresent: [:cls |
      cls 
        siteUsername: 'dalehenrich';
        sitePassword: ''] ].
  Metacello new
    baseline: 'Metacello';
    repository: 'filetree:///opt/git/metacello-work/repository';
    get.
  Metacello new
    baseline: 'Metacello';
    repository: 'filetree:///opt/git/metacello-work/repository';
    lock.
  Metacello new
    baseline: 'Metacello';
    repository: 'filetree:///opt/git/metacello-work/repository';
    onConflict: [:ex | ex allow];
    load.
  Metacello new
    baseline: 'Tode';
    repository: 'filetree:///opt/git/tode/repository';
    lock.
  MCWorkingCopy allManagers
    do: [ :wc | 
      (wc packageName beginsWith: 'Ston')
        ifTrue: [ wc unregister ] ].
  Metacello new
    configuration: 'TodeClient';
    version: #dev;
    repository: 'filetree://', gs_home, '/repository';
    get;
    onConflict: [:ex :registration  | 
      registration baseName = 'Ston' 
        ifTrue: [ ex useIncoming] 
        ifFalse: [ex pass] ];
    load: #('Core' 'Visualize')  ]
      on: Warning, MetacelloSkipDirtyPackageLoad
      do: [:ex | 
        (ex isKindOf: MetacelloSkipDirtyPackageLoad)
          ifTrue: [ ex resume: false ]
          ifFalse: [ 
            Transcript cr; show: ex description.
            ex resume: true ] ].

