#!/bin/bash
set -e

USER_NAME="test_shootsta_user"
USER_PASS="test_shootsta_pass"

DATABASE="shootsta_test"

if psql -t -c '\du' | cut -d \| -f 1 | grep -qw $USER_NAME; then
  echo "admin exists"
else
  echo "admin does not exist"
  psql -qc "CREATE USER $USER_NAME WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  CREATEROLE
  NOREPLICATION
  PASSWORD '$USER_PASS';"
  psql -qc "GRANT $USER_NAME TO postgres;"
  echo "admin created"
fi
#
if psql -lqt | cut -d \| -f 1 | grep -qw "$DATABASE"; then
  echo "DATABASE $DATABASE exist"
else
  echo "db does not exist"
  createdb --owner=$USER_NAME --encoding='UTF8' $DATABASE
  psql -qc "GRANT ALL ON DATABASE \"$DATABASE\" TO $USER_NAME;"
  echo "db created"
fi
echo '________________________'

if ! npm -g ls | grep sequelize-cli; then
  echo "install sequelize-cli"
  npm install -g sequelize-cli
else
  echo "sequelize-cli exist"
fi