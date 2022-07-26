#!/bin/bash

package=''

which prettier     &>/dev/null || package="$package prettier"
which svgo         &>/dev/null || package="$package svgo"
which only-allow   &>/dev/null || package="$package only-allow"
which lint-staged  &>/dev/null || package="$package lint-staged"
which concurrently &>/dev/null || package="$package concurrently"
which json-server  &>/dev/null || package="$package json-server"

[ -z "$package" ] || npm install --global $package
