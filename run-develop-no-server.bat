REM run yarn dev:hot-reload:debug in another console!

REM Stop and remove last image build.
docker-compose down
REM image again
docker-compose -f docker-compose-no-client.yml build
docker-compose -f docker-compose-no-client.yml up