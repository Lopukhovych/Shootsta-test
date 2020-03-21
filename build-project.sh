#!/bin/bash
set -e

cd client || exit
npm run build_local && cd ..
echo 'frontend installed'

cd backend || exit
npm install
echo 'backend installed'

sequelize-cli db:migrate
echo 'migrated'

npm run start
echo 'runned prod'