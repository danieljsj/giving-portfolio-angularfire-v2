#!/bin/bash
echo DEPLOMENT ACTIONS:
cat deploy.bash
echo
echo
read -p "READ AND PRESS ANY KEY TO APPROVE, OR PRESS CTRL+C TO CANCEL!"



original_branch_name="$(git symbolic-ref HEAD 2>/dev/null)" ||
original_branch_name="(unnamed branch)"     # detached HEAD
original_branch_name=${branch_name##refs/heads/}


#todo: quit the script if not currently in master

git checkout deploy

git merge master

bower install

rsync -r bower_components/ app/bower_components/

sass app/styles/main.scss app/styles/main.css

firebase deploy

#todo: trigger a phonegap update programmatically


git checkout $original_branch_name