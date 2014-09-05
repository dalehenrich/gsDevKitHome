actions
runUpgrader
	| shell |
	shell := TDShell sessionDescription: self sessionDescription debugMode: true.
	shell batchMode: true.
	shell
		evaluateSmalltalk:
			'
	Metacello new
	  baseline: ''GsUpdater'';
	  repository: ''filetree://' , self upgradesRepositoryHome pathString
				,
					''';
	  load.
	(Smalltalk at: #GsUpdater) upgrade' , self option