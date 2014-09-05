#!/bin/bash -x

set -e # exit on error

stopStone travis
stopStone travis_2
stoneExtent travis_2
startStone travis_2

cd ${GS_HOME}/gemstone/stones/travis_2

. defStone.env

topaz -l -q <<EOF
iferr 1 stk
iferr 2 stack
iferr 3 exit 1
login
run
Metacello new
  baseline: 'GsUpgrader';
  repository: 'filetree://${GS_HOME}/upgrades/repository';
  load.
(Smalltalk at: #GsUpgrader) upgradeGLASS.
(Smalltalk at: #GsUpgrader) upgradeGLASS.
(Smalltalk at: #GsUpgrader) upgradeMetacello.
(Smalltalk at: #GsUpgrader) upgradeMetacello.
(Smalltalk at: #GsUpgrader) upgradeGLASS1.
(Smalltalk at: #GsUpgrader) upgradeGLASS1.
(Smalltalk at: #GsUpgrader) upgradeMetacello.
(Smalltalk at: #GsUpgrader) upgradeGLASS1.
EOF

