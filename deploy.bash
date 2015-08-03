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

#getting the 'deploy' branch to contain ALL (up-to-date) site files:

git checkout deploy
git merge master

bower install
rsync -r bower_components/ app/bower_components/

sass app/styles/main.scss app/styles/main.css

git add app/bower_components
git add app/styles/main.css

git commit -m "deployment commit of bower_components, main.css"
echo "Don't worry if there's a commit error; it just means no changes to main.css or bower_components."
git push origin deploy
echo


read -p "firebase deploy? (y/n): " #-n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    firebase deploy
fi

echo
echo "NOTE: PhoneGapBuild must be built/triggered manually." # Implementation is too large for this script, and requires storing password. not worth it. http://snipplr.com/view/61101/one-click-build-for-phonegap-build-to-android/


git checkout $original_branch_name