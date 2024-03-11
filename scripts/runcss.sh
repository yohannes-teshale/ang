#!/bin/bash

cssFilePath=""
selectorsFilePath=""

usage() {
    echo "Usage: $0 -c <cssFilePath> -s <selectorsFilePath>"
    echo "  -c      Full path to the CSS file"
    echo "  -s      Full path to the file containing CSS selectors"
    echo "  -h      Display this help and exit"
}

while getopts "hc:s:" opt; do
    case $opt in
        c) cssFilePath="$OPTARG" ;;
        s) selectorsFilePath="$OPTARG" ;;
        h) usage
           exit ;;
        \?) echo "Invalid option -$OPTARG" >&2
            usage
            exit 1 ;;
    esac
done

if [ -z "$cssFilePath" ] || [ -z "$selectorsFilePath" ]; then
    echo "Error: Missing required arguments."
    usage
    exit 1
fi

node extractCss.js "$cssFilePath" "$selectorsFilePath"
