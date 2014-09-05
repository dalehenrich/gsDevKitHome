Usage: upgrader [ --help] <stone-name> [GLASS|Metacello|GLASS1]
	
Documentation:
Run the GsUpgrader and upgrade GLASS, Metacello or GLASS1. If you have installed tODE
then you do not need to run this command. Executing the tODE shell expression
`project load GLASS1` is all that is needed.

Normally, you should just upgrade GLASS1. If GLASS1 has not been installed yet, this 
option first upgrades GLASS, then upgrades Metacello, then loads GLASS1 and then locks
Grease to reference the github repo. If GLASS1 has already been installed, then GLASS1
is updated to the latest commit on github (along with Metacello and Grease).

If you don't want to install GLASS1 then you can use GLASS to get upgraded to the 
last version GLASS.

Use Metacello to upgrade to the latest and greatest version of Metacello.

Examples:
    upgrader --help
    upgrader kit GLASS
    upgrader kit Metacello
    upgrader kit GLASS1

