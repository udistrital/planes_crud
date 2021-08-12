#!/usr/bin/env bash

set -e
set -u
set -o pipefail

export PLANES_CRUD_USER="$(aws ssm get-parameter --name /${PARAMETER_STORE}/planes_mongo_crud/db/username --output text --query Parameter.Value)"
export PLANES_CRUD_PASS="$(aws ssm get-parameter --with-decryption --name /${PARAMETER_STORE}/planes_mongo_crud/db/password --output text --query Parameter.Value)"

exec node dist/main