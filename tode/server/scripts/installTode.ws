Transcript
  cr;
  show: '-----Upgrading tODE to latest master version'.
((System gemEnvironmentVariable: 'GS_TRAVIS') = 'true') 
  ifTrue: [
    "Running on travis"
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
