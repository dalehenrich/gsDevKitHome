# Zinc 2.4.3 for GemStone 2.4 and 3.x [![Build Status](https://travis-ci.org/GsDevKit/zinc.png?branch=gs_master)](https://travis-ci.org/gs_master/zinc)
The [GsDevKit Zinc project][3] is a fork of [Sven Van Caekenberghe's Zinc project][4]. 
Currently only the *Core* and *Tests* packages have been ported to GsDevKit:
* Zinc-HTTP
* Zinc-Tests
* Zinc-Character-Encoding-Core
* Zinc-Character-Encoding-Tests
* Zinc-FileSystem-Legacy
* Zinc-Resource-Meta-Core
* Zinc-Resource-Meta-Tests

###Batch Install
To install from the shell:

```Shell
$GS_HOME/projects/zinc/createProjectEntry <stone-name>
$GS_HOME/projects/zinc/loadProject <stone-name>
```

###Interactive Install
Register project with tODE:

```Shell
$GS_HOME/projects/zinc/createProjectEntry <stone-name>
```

   * Install from tODE command line:


      ```Shell
      project load ZincHTTPComponents
      ```

     or install from tODE project list:

     ![install zinc](installZinc.png)

[3]: https://github.com/GsDevKit/zinc
[4]: https://github.com/svenvc/zinc
