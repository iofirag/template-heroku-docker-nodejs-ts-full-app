REM stop all docker running containers
docker container kill docker-full-app-oa docker-full-app-oa_mongo docker-full-app-oa_adminmongo

REM REM remove all docker stoped containers & images
docker volume prune