# Scripts


[Windows Batch Script: FTP Folder Copy with Date and Time](/Linux/FtpFolderCopyWithDateTimePrefix.md) 2012-02-04

Windows batch script to copy files from an ftp server.

[dns-323 ftp file copy using fun plug, curl and cron](/Linux/dns-323_ftp_file_copy.md) 2010-06-12

Getting shell access and a cron file copy setup on an old D-Link DNS-323 NAS.


# Handy Linux Commands
Don’t forget the command: `man commandname` for program/command specific information. 
## Using Command Line
### Get the Drive Usage / Free space

Use command: `df -h`

Get the Folder size

Use Command: `du –h`

Schedule a command

This will edit current users crontab config: `crontab –e`

This will list current users crontab config: `crontab –l`

Tasks are entered with the following syntax:

```
* * * * * (command; another command ;)
```

Where the *’s represent: Min, hrs, days of month, month of yr ,day of week

## Printing a PDF

The following command line command prints a PDF file and moves it to a folder called printed.

Prerequisites:

- GhostScript is installed
- Printer is installed (and is a hp laserjet)
- There is a ‘printed’ folder in the same folder as the PDF file 

```
Gs –sDEVICE=ljet4 sOutputFile=|lpr *.pdf; mv *.pdf printed/; echo ALL DONE !!!;
```


## Using VI Editor (VIM)
Basic Operation

Enter edit mode with `Ins`

Return to command mode with `Esc`.

Quit without saving with ‘:q!’ in command mode.

Quit with saving with `ZZ` in command mode.

Save with `:w` in command mode.

Save As with `:w newfilename` in command mode.

Turn on syntax highlighting with `:syntax on`.

Modify Configuration Defaults

Open `/etc/vim/vimrc` or `.vimrc` in your home directory

To turn on Syntax Highlighting by default, change the line “ syntax on to syntax on.

## Find SAMBA Configuration smb.conf file

run the command:
```
ps -Af | grep smb.conf
```
obviously samba will need to be running for this to work.

Otherwise you can try the slower:
```
find / | grep smb.conf
```
