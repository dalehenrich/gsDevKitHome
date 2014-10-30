Transcript
  cr;
  show: '-----Upgrading Metacello to latest version on master branch'.
((System gemEnvironmentVariable: 'GS_TRAVIS') ~= 'true') ifTrue: [ 
  "Only needed if you use a non-standard repo for Metacello"
  Transcript cr; show: 'Locking Metacello: filetree:///opt/git/metacello-work/repository'.
  GsDeployer bulkMigrate: [
    Metacello new
      baseline: 'Metacello';
      repository: 'filetree:///opt/git/metacello-work/repository';
      lock ].
  ].
