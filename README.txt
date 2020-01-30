prerequest installed:
- NodeJS
- Npm
- yarn
- Docker-Desktop

----------------------------------------------

* Development / vpn *
  change script in Dockerfile to 'start:dev:hotreload' | 'start:dev:hotreload-debug' | 'start:dev:hotreload-debug-wait'
  change environment ('env_file' key) in docker-compose.yml to development ('dev.env')
  run:
    $ docker-compose down
    $ docker-compose build
    $ docker-compose up


-------

* Production *
  change script in Dockerfile to 'start'
  change environment ('env_file' key) in docker-compose.yml to production ('prod.env')

* Production for Heroku *
  https://devcenter.heroku.com/articles/container-registry-and-runtime#getting-started

  download heroku cli
  (Heroku doesnt use docker-compose at all. so also doesnt our environment files. so doesnt need to change anything.)
  run:
    $ heroku login
    $ heroku container:login
    $ heroku create <your-heroku-app-name>
      (optional: 
        in your Heroku app :
        Resources > Add-ons
        add "mLab MongoDB" add-on.
        you can view your mongoDB credentials in app vars under:
        settings > Config Vars > MONGODB_URI)
    $ heroku container:push web -a <your-heroku-app-name>
    $ heroku container:release web -a <your-heroku-app-name>
    $ heroku open -a <your-heroku-app-name>

----------------------------------------------

* Features: *
docker
  nodemon
    hot-reload
  inspector
    breakpoint
    breakpoint-wait
  ts-node