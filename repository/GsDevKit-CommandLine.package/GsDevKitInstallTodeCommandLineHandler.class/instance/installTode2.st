actions
installTode2
	| result |
	result := TDShell sessionDescription: self sessionDescription evaluate: 'script --script=installServerTode2' debugMode: false.
	Transcript
		cr;
		show: result printString