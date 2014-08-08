accessing
createChildInstance: father mother: mother
  "10% chance to be fatherless or motherless"

  | personClass |
  personClass := {IXPerson.
  IXPerson.
  IXPerson.
  IXPerson.
  IXPerson.
  IXPerson.
  IXPerson.
  IXPerson.
  IXFatherlessPerson.
  IXMotherlessPerson} atRandom.
  ^ personClass createPerson
    father: father;
    mother: mother;
    yourself
