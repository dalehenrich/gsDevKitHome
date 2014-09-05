upgrading
upgradeMetacello
  | metacello projectSpec |
  self loadMetacelloPreview.
  metacello := Metacello image baseline: 'Metacello'.
  projectSpec := metacello copy list first.
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
      metacello copy get.
      metacello copy load ]