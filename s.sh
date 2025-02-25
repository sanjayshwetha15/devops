#!/bin/bash
echo "check the name"
if [ -f $name ]
then
echo "$name is file"
elif [ -d $name ]
then
echo "$name is directory"
else
echo "$name does not exist"
fi
