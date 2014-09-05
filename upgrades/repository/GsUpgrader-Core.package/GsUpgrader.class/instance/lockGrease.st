locking
lockGrease
  self greaseLocked
    ifTrue: [ ^ self ].
  Transcript
    cr;
    show: '-----Locking Grease'.
  Metacello new
    baseline: 'Grease';
    repository: self greaseRepositoryDescription;
    lock