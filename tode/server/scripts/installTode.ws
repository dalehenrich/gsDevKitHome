"Fourth and final step in tODE installation process: install tODE."
Transcript
  cr;
  show: '-----Upgrading tODE to latest master version'.
<<<<<<< HEAD
((System gemEnvironmentVariable: 'GS_TRAVIS') = 'true') 
  ifTrue: [
    "Running on travis"
    Transcript cr; show: 'Loading tODE from github://dalehenrich/tode:dev/repository'.
    GsDeployer bulkMigrate: [ 
      "tODE install loads GLASS1"
      Metacello new
        baseline: 'Tode';
        repository: 'github://dalehenrich/tode:dev/repository';
        get.
      Metacello new
        baseline: 'Tode';
        repository: 'github://dalehenrich/tode:dev/repository';
        onConflict: [ :ex | ex allow ];
        load: 'GemStone Dev' ] ] 
  ifFalse: [ 
    Transcript cr; show: 'Loading tODE from filetree:///opt/git/tode/repository'.
    GsDeployer bulkMigrate: [ 
      "tODE install loads GLASS1"
      Metacello new
        baseline: 'Tode';
        repository: 'filetree:///opt/git/tode/repository';
        get.
      Metacello new
        baseline: 'Tode';
        repository: 'filetree:///opt/git/tode/repository';
        onConflict: [ :ex | ex allow ];
        load: 'GemStone Dev' ] 
  ].
=======
GsDeployer bulkMigrate: [ 
  Metacello new
    baseline: 'Tode';
    repository: 'github://dalehenrich/tode:master/repository';
    get.
  Metacello new
    baseline: 'Tode';
    repository: 'github://dalehenrich/tode:master/repository';
    onConflict: [ :ex | ex allow ];
    load: 'GemStone Dev' ].
>>>>>>> master
