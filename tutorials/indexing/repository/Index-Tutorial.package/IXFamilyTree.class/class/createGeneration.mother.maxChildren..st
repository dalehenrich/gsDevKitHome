as yet unclassified
createGeneration: father mother: mother maxChildren: maxChildren
  | siblings min |
  min := maxChildren - 3 max: 1.
  siblings := Array new.
  (Collection randomForPickingintegerBetween: min and: maxChildren)
    timesRepeat: [ siblings add: (self createChild: father mother: mother) ].
  ^ siblings