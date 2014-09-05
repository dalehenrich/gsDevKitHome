upgrading
upgradeGLASS1
  | metacello projectSpec |
  self glass1Loaded
    ifFalse: [ 
      self upgradeGLASS.
      self glass1Present
        ifFalse: [ ^ self loadGLASS1 ] ].
  self upgradeMetacello.
  metacello := Metacello image baseline: 'GLASS1'.
  projectSpec := metacello copy list first.
  projectSpec repositorySpecs
    detect: [ :repoSpec | repoSpec description = self glass1RepositoryDescription ]
    ifNone: [ 
      self
        notify:
          'GLASS1 project repository is not in standard location ('
            , self glass1RepositoryDescription
            , '). The upgrade of GLASS1 may not be complete.' ].
  GsDeployer
    deploy: [ 
      Transcript
        cr;
        show: '-----Upgrading GLASS1'.
      metacello copy get.
      metacello copy load.
      self lockGrease ]