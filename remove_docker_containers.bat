REM stop all docker running containers
docker container kill docker-full-app-oa docker-full-app-oa_dbservice docker-full-app-oa_adminmongo docker-full-app-oa_adminer

REM REM remove all docker stoped containers & images
docker volume prune