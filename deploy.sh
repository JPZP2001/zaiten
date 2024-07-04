#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# initialize a new git repository
git init
git add -A
git commit -m 'deploy'

# push to the gh-pages branch
git push -f git@github.com:jpzp2001/zaiten.git HEAD:gh-pages

# return to the previous directory
cd -
