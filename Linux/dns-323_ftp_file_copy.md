# dns-323 ftp file copy using fun plug, curl and cron

My Brother MFC-440CN Scanner/Printer provides ftp access to the memory card inserted in the card reader and also allows you to scan as pdf direct to the memory card. I wanted to use this as a path to move scanned documents onto my DNS-323 NAS without a PC in the loop. To do this I installed fun_plug and setup a cron job on the DNS-323 to move the files on the memory card to a folder on the DNS-323 every 20 seconds. I couldn’t find a package for the standard ftp client so my script uses curl (somewhat crudley) to fetch and delete the files from the MFC-440CN via FTP.

Here are detailed instructions of how I got the this working:

1. Install fun_plug (I used the 0.5 version and had my DNS-323 running firmaware 1.08)
    - You only need to go as far as step 6 (ssh working & repository)
    - I started at step 3, as I already use a static IP for my DNS-323
3. Reboot the DNS-323 after fun_plug is installed (required to get funpkg working)
4. Install CURL, at the prompt type:
```
cd /ffp/
wget curlpackageurl
wpkg packagename
```

4. create a script to copy pdfs from ftp to a directory, by creating a file `moveoneftp.sh` containing the following, However you will need to put your own settings in under `#settings vars`:

```
#!/bin/sh# this script uses curl to copy the first file in the source ftp folder to the target dir

#fix path for funplugexport PATH=/ffp/sbin:/ffp/bin:$PATH

#run it regularly with cron to crudely move a ftp's contents#move means copy and then delete - be careful

#settings varssource_ftp_site="ftp://192.168.1.18/"source_ftp_dir="BROTHER/"source_ftp_dir_path="$source_ftp_site$source_ftp_dir"

target_dir="/mnt/HD_b2/Files/Scan/"file_extension=".PDF"

#programgrep_string="w*$file_extension*w"

echo The GREP is: $grep_stringecho The Source is: $source_ftp_direcho The Target is: $target_dir

#get first file name and process if one foundif file_name=$(curl $source_ftp_dir_path | grep -o -m1 $grep_string)then

 echo The file is: $file_name

 #wait for 15 seconds in case the scanner is still writing to the file sleep 15

 # now copy the file down from the ftp source file_source="$source_ftp_dir_path$file_name" file_target="$target_dir$(date +"%Y-%m-%d_%H_%M_%S.pdf")"

 echo The file source is: $file_source echo the file target is: $file_target

 #copy if  curl $file_source -o $file_target then  #purge  ftp_cmd="DELE $source_ftp_dir$file_name"

  echo ftp command is: $ftp_cmd  curl $source_ftp_site -Q "$ftp_cmd" fifi
```

5. Create the file with the following under ‘/ffp/start’ called ‘appendcron.sh’ which will add our cron jobs to cron on boot:

```
#!/bin/sh

CRONTXT=/mnt/HD_a2/crontab.txt

# start with existing crontab/bin/crontab -l > $CRONTXT

# add cron jobs# job every minute to check for scanned file/bin/echo "* * * * *  /bin/sh /ffp/moveoneftp.sh;sleep 20;/bin/sh /ffp/moveoneftp.sh;sleep 20;/bin/sh /ffp/moveoneftp.sh;" >> $CRONTXT

# install the new crontab/bin/crontab $CRONTXT

# clean up/bin/rm $CRONTXT
```

6. Next we need to make our files runnable by chmoding the files we created with ‘a+x’:
```
chmod a+x /ffp/moveoneftp.sh
chmod a+x /ffp/start/appendcron.sh
```

7. Reboot and everything should be working! you can check by running ‘top’ and seeing if the script is running.

## References/Thanks

[Cron append script I copied from somewhere (it is all over the web) – http://abuhawa.wordpress.com/2009/05/16/backup-from-volume_1-to-volume_1-using-crontab-rsync/](http://abuhawa.wordpress.com/2009/05/16/backup-from-volume_1-to-volume_1-using-crontab-rsync/)

[fun_plug installation on DNS-323 – dns323 wiki – http://wiki.dns323.info/howto:1st_steps](http://wiki.dns323.info/howto:1st_steps)

[cURL documentation – http://curl.haxx.se/docs/manpage.html#-X–request](http://curl.haxx.se/docs/manpage.html#-X–request)

[cURL examples of getting and deleting files via ftp – http://linux.byexamples.com/archives/320/using-curl-to-access-ftp-server/](http://linux.byexamples.com/archives/320/using-curl-to-access-ftp-server/)

[Forum topic explaining how to config path so shell script runs under cron – http://www.unix.com/shell-programming-scripting/128392-script-runs-fine-but-not-cron.html](http://www.unix.com/shell-programming-scripting/128392-script-runs-fine-but-not-cron.html)

[How to use grep and only return matched text – http://stackoverflow.com/questions/1546711/grep-show-only-words-that-match-search-pattern](http://stackoverflow.com/questions/1546711/grep-show-only-words-that-match-search-pattern)

(note: use -m1 to return only one/first result)

[Cheat sheet for vi (its been a while) – http://www.eec.com/business/vi.html](http://www.eec.com/business/vi.html)

