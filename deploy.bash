#!/bin/bash

echo
echo "CREATING MAIN STYLESHEET"
echo "via: sass app/styles/main.scss app/styles/main.css"

sass app/styles/main.scss app/styles/main.css


echo
echo "DEPLOYING TO FIREBASE"
echo "via 'firebase deploy' :"

firebase deploy
