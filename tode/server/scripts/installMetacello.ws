<<<<<<< HEAD
Transcript
  cr;
  show: '-----Upgrading Metacello to latest version on master branch'.
((System gemEnvironmentVariable: 'GS_TRAVIS') ~= 'true') ifTrue: [ 
=======
"Second step in tODE installation process: lock Metacello if you want to use a non-standard repository.
 By default github://dalehenrich/metacello-work:master/repository will be installed
 during installGLASS1 (third step)."
false ifTrue: [ 
>>>>>>> master
  "Only needed if you use a non-standard repo for Metacello"
  Transcript cr; show: 'Locking Metacello: filetree:///opt/git/metacello-work/repository'.
  GsDeployer bulkMigrate: [
    Metacello new
      baseline: 'Metacello';
      repository: 'filetree:///opt/git/metacello-work/repository';
      lock ].
  ].
