activation
evaluate
	"we only take one swipe at stdin, so this command is not appropriate for use as a REPL"

	| script response |
	script := OSProcess readFromStdIn.
	script.
	script
		ifNil: [ 
			"no stdin available"
			^ self ].
	script
		linesDo: [ :line | 
			line isEmpty
				ifFalse: [ 
					Transcript
						cr;
						show: 'tode > ' , line.
					response := TDShell sessionDescription: self sessionDescription evaluate: line.
					Transcript
						cr;
						show: response ] ].
	Transcript cr