Transcript
  cr;
  show: '-----Upgrading tODE to latest master version'.
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
    load: 'GemStone Dev' ].
