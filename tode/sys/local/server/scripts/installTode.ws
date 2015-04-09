"Fourth and final step in tODE installation process: install tODE."

Transcript cr; show: '---Step 4 of tODE bootstrap process: execute CUSTOM installTode.ws'.

GsUpgrader batchErrorHandlingDo: [

  Transcript
    cr;
    show: '-----Install tODE from local git clone'.
  GsDeployer bulkMigrate: [ 
    Metacello new
      baseline: 'Tode';
      repository: 'filetree:///opt/git/tode/repository';
      get;
      load: 'GemStone Dev' ] ]
