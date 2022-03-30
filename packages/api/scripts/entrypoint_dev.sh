#!/bin/sh

echo "run migrations"
(cd /howder && yarn migrate)

echo "run ignitor"
(cd /howder && yarn dev)
