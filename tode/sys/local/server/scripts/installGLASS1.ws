"Third step in tODE installation process: install GLASS1.
 Install GLASS1 from local git clone."

Transcript cr; show: '---Step 3 of tODE bootstrap process: execute CUSTOM installGLASS1.ws'.

GsUpgrader batchErrorHandlingDo: [

  Transcript
    cr;
    show: 'Lock GLASS1: filetree:///opt/git/glass/repository'.
  GsDeployer
    bulkMigrate: [ 
      Metacello new
        baseline: 'GLASS1';
        repository: 'filetree:///opt/git/glass/repository';
        lock ].

  Transcript 
    cr; 
    show: 'Lock FileTree: filetree:///opt/git/filetree/repository'.
  GsDeployer bulkMigrate: [
    Metacello new
      baseline: 'FileTree';
      repository: 'filetree:///opt/git/filetree/repository';
      lock ].

  Transcript
    cr;
    show: '-----Upgrade GLASS1 using gsUpgrader'.

  GsUpgrader upgradeGLASS1.

  Transcript
    cr;
    show: '-----Lock and Load Grease: filetree:///opt/git/Grease/repository'.

  GsDeployer bulkMigrate: [
    Metacello new
      baseline: 'Grease';
      repository: 'filetree:///opt/git/Grease/repository';
      onLock: [:ex | ex break ];
      load: 'Grease-Core' ] ].
