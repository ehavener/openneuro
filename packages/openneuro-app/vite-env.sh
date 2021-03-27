#!/bin/sh
# Client side variables need VITE_ prefix
export VITE_CRN_SERVER_URL=$CRN_SERVER_URL
export VITE_API=${CRN_SERVER_URL}/crn/
export VITE_GRAPHQL_URI=$GRAPHQL_URI
export VITE_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
export VITE_GLOBUS_CLIENT_ID=$GLOBUS_CLIENT_ID
export VITE_ORCID_CLIENT_ID=$ORCID_CLIENT_ID
export VITE_ORCID_URI=$ORCID_URI
export VITE_ORCID_REDIRECT_URI=$ORCID_REDIRECT_URI
export VITE_GOOGLE_TRACKING_ID=$GOOGLE_TRACKING_ID
export VITE_ENVIRONMENT=$ENVIRONMENT
export VITE_SUPPORT_URL=$FRESH_DESK_URL
export VITE_DATALAD_GITHUB_ORG=$DATALAD_GITHUB_ORG
export VITE_AWS_S3_PUBLIC_BUCKET=$AWS_S3_PUBLIC_BUCKET
yarn start
