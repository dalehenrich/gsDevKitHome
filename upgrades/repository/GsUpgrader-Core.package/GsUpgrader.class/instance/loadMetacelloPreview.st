loading
loadMetacelloPreview
  "Bootstrap Metacello Preview, using mcz files (#'previewBootstrap' symbolic version"

  self metacelloPreviewLoaded
    ifTrue: [ 
      Transcript
        cr;
        show: '-----Metacello Preview already loaded'.
      ^ self ].
  Transcript
    cr;
    show: '-----Loading Metacello Preview'.
  Gofer new
    gemsource: 'metacello';
    package: 'ConfigurationOfMetacello';
    load.
  GsDeployer
    deploy: [ 
      "load the Metacello Preview"
      ((Smalltalk at: #'ConfigurationOfMetacello') project
        version: #'previewBootstrap') load.
      (Smalltalk at: #'Metacello') new
        configuration: 'MetacelloPreview';
        version: #'stable';
        repository: self metacelloPreviewRepositoryDescription;
        load ]