### Prerequest installed:
- NodeJS
- Npm
- yarn
- Docker-Desktop
  - Settings > Resources > File-Sharing > Checked with V.

----------------------------------------------

### Features:
docker
  - nodemon
      hot-reload
  - inspector
      breakpoint
      breakpoint-wait
  - ts-node
  - develop / production environment modes
  
----------------------------------------------

### Environment Vars:
  base-shared variables in:
    - .env
  override variables in:
    - environment/dev.env
    - environment/prod.env

----------------------------------------------

### Development / vpn
  change script in docker-compose.override.yml to one of 
  run (as administrator):
    docker:[server + db + db-viewer]
    $ run-as-develop-mode.bat

 - Container ip:
    NOTE:
      - if you are using Docker-Toolbox you can see your ip address in Docker-Quickstart-Terminal by running: "$(docker-machine ip)"
      (Docker toolbox doesn't map ports to localhost. It maps it to the Docker VM IP's)
      - if you are using Docker-For-Windows your ip will be just normal as localhost / 127.0.0.1`

- can run also as server stand alone and docker:[db + db-viewer] project by running:
    $ yarn start | dev:hot-reload | dev:hot-reload:debug | dev:hot-reload:debug:wait
    and in another terminal:
    $ ./run-develop-no-server.bat

### Production
  run (as administrator):
    docker:[server]
    $ run-as-production-mode.bat


### Production for Heroku
  https://devcenter.heroku.com/articles/container-registry-and-runtime#getting-started
  download heroku cli
  (by default: Heroku doesnt use docker-compose files at all. 
   so also doesnt use our environment files.
   optional: add "heroku-buildpack-docker-compose" add-on to support docker-compose.yml)
  run:
    $ heroku login
    $ heroku container:login
    $ heroku create <your-heroku-app-name>
      (optional: 
        in your Heroku app:
          Resources > Add-ons
        add "mLab MongoDB" add-on.
        you can view your mongoDB credentials in app vars under:
          settings > Config Vars > MONGODB_URI)
      (optional: 
        add new vars to heroku app
          $ heroku config:set TEST=my-test-var)
    $ heroku container:push web -a <your-heroku-app-name>
    $ heroku container:release web -a <your-heroku-app-name>
    $ heroku open -a <your-heroku-app-name>

### Q.A
- host cant access docker services?
  
  1. toolbox magical ip
    
    check your ip by running `docker-machine ip`
  
  2. Add NodeJS/Docker/VB to Firewall\Allowed apps
    
    `Control Panel\System and Security\Windows Defender Firewall\Allowed apps`

  3. check exported ports of services in `.env` files

  4. update VB to latest version (for creating VB network adapters, etc.. successfully)
  
  5. run as administrator!


## Support
Heroku dyno support
You also can use Heroku's `mLab MongoDB` add-on for easy setup for the production server 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/<git-username>/<repo-name>)