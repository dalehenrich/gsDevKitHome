[ 
  "Tests pharo todeLoad.st"
  | gs_home |
  gs_home := Smalltalk os environment at: 'GS_HOME'.
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
  Metacello new
    configuration: 'TodeClient';
    version: #dev;
    repository: 'filetree://', gs_home, '/repository';
    get;
    load: #('Core' 'Visualize')  ]
      on: Warning
      do: [:ex | 
        Transcript cr; show: ex description.
        ex resume ].

