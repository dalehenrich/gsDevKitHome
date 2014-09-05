upgrading
upgradeMetacello
  | metacello projectSpec |
  self loadMetacelloPreview.
  projectSpec := (Metacello image
    baseline: [ :spec | spec name = 'BaselineOfMetacello' ];
    list) first.
  projectSpec repositorySpecs
    detect: [ :repoSpec | repoSpec description = self metacelloRepositoryDescription ]
    ifNone: [ 
      self
        notify:
          'Metacello project repository is not in standard location ('
            , self metacelloRepositoryDescription
            , '). The upgrade of Metacello may not be complete.' ].
  GsDeployer
    deploy: [ 
      Transcript
        cr;
        show: '-----Upgrading Metacello'.
      metacello := Metacello image baseline: 'Metacello'.
      metacello copy get.
      metacello copy load ]