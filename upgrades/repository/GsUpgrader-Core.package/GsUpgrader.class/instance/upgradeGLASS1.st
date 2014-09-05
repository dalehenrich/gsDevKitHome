upgrading
upgradeGLASS1
  | metacello projectSpec |
  self glass1Loaded
    ifFalse: [ 
      self upgradeGLASS.
      self glass1Present
        ifFalse: [ ^ self loadGLASS1 ] ].
  self upgradeMetacello.
  projectSpec := (Metacello image
    baseline: [ :spec | spec name = 'GLASS1' ];
    list) first.
  projectSpec isLocked
    ifTrue: [ 
      projectSpec repositorySpecs
        detect: [ :repoSpec | repoSpec description = self glass1RepositoryDescription ]
        ifNone: [ 
          self
            notify:
              'GLASS1 project repository is not in standard location ('
                , self glass1RepositoryDescription
                , '). The upgrade of GLASS1 may not be complete.' ].
      metacello := Metacello image baseline: 'GLASS1' ]
    ifFalse: [ 
      metacello := Metacello new
        baseline: 'GLASS1';
        repository: self glass1RepositoryDescription;
        yourself ].
  GsDeployer
    deploy: [ 
      Transcript
        cr;
        show: '-----Upgrading GLASS1'.
      metacello copy get.
      metacello copy load.
      self lockGrease ]