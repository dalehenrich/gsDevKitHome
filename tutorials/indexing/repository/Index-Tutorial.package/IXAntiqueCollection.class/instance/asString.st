as yet unclassified
asString
  ^ super asString , '[$' , self askingPrice printString , ']'
