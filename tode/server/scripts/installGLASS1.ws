Transcript
  cr;
  show: '-----Upgrading GLASS1 to most recent master version'.
((System gemEnvironmentVariable: 'GS_TRAVIS') ~= 'true') ifTrue: [ 
  "only needed if you want to use a non-standard repo for GLASS1"
  Transcript cr; show: 'Locking GLASS1: filetree:///opt/git/glass/repository'.
  GsDeployer bulkMigrate: [
    Metacello new
      baseline: 'GLASS1';
      repository: 'filetree:///opt/git/glass/repository';
      lock ].
  ].
