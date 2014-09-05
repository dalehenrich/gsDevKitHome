testing
greaseLocked
  (Metacello image
    baseline: [ :spec | spec name = 'BaselineOfGrease' ];
    list)
    do: [ :greaseSpec | 
      greaseSpec isLocked
        ifTrue: [ ^ true ] ].
  ^ false