# Django Webpack Bootstrap Project Template
## Based onMinimal Django Project Template

My attempt at creating the most bare-bones Django project possible, that is still ready to deploy to a Dokku server. Now with Bootstrap!&#8482;

* Basic Django installation project with 1 app, 'main'
* Runs on sqlite built in database
* Includes URL config and routes for at least 1 viewable page (index.html)
* Static assets directories
* Deploys to a dokku server in as few steps as possible


Start with these comands on a *nix based system with the appropriate requirements:

```
$ mkdir my-new-django-project && cd $_
$ pipenv --python 3
$ pipenv shell
$ pipenv install Django
```

This template can be used locally or remote:

Local use syntax:
```
django-admin startproject --template ~/project-name new_django_project .
```

Remote use syntax:
```
django-admin startproject --template https://github.com/username/repo/archive/master.zip --name=Procfile,package.json new_django_project
```
The `--name=Procfile,package.json bit tells the system to rename Procfile and package.json files properly. For more, here is the documentation page: https://docs.djangoproject.com/en/2.2/ref/django-admin/#startproject

### Develop locally
You may find anther way works better - however you can easily use the Pipenv created to create the project like:

```
$ pipenv install -r new_django_project/requirements.txt 
```
Install the node / npm dependencies:
```
$ cd new_django_project/ # move into the project directory (where package.json is)
$ npm i # that should do it
```
The above will install the project requirements for deploying this very basic project. If other libraries are used in development or production - add them to requirements.txt for deployment as needed.

### Static Files
Static files are pretty confusing. Whitenoise is an external Django library that makes it easier to use 1 server for both hosting Django and static files. Whitenoise requires and installed app and a layer of middleware to work correctly.

Run webpack to generate static assets
```
$ npx webpack 
```

The `collectstatic` command should create a staticfiles dir at the root level, and relocate webpack static assets to Django staticfiles:
```
$ ./manage.py collectstatic
```

There is probably a less redundant way to accomplish this.

### Deployment
When the project is ready to deploy, use the following steps to deploy to a server running Dokku:

* Note - a `.gitignore` file is a good idea - especially for the `staticfiles` directory. This will be re-generated on the server, and will hold a potential ton of stuff you don't want to commit and deploy.

#### Changes to `settings.py`
Don't forget to change the SECRET_KEY to something better - or better yet, add in an environment variable setting system.

Also important - set DEBUG to `False` for production deployment. This could also be handled by an environment variable setting. One dirty trick is to set `DEBUG = False` immediately prior to deployment, git commit the project and deploy. You can change DEBUG back to True for additional local development work.

If you're deploying, add server to ALLOWED_HOSTS, something like:
`- ALLOWED_HOSTS = [*]`
`ALLOWED_HOSTS = ['127.0.0.1','your-fqdv.net']`

Do the usual git add / commit stuff after files are changed and ready.

#### Basic Dokku setup on server
```
$ dokku apps:create your_app
# map your DNS to dokku*
$ dokku domains:add your_app your_app.fqdn.net
# set NPM_CONFIG_PRODUCTION to false to help Dokku run webpack**
$ dokku config:set your_app NPM_CONFIG_PRODUCTION=false
```
* Note you may need to add the app to any subdomain DNS on your web host as well
** See this issue report for all the gory details: https://github.com/dokku/dokku/issues/1434

```
# after git init, add remote for dokku server
git remote add dokku dokku@your_dokku_fqdn:myDjangoApp
```

Should be ready to git push!
`git push dokku master`

 TODO:
- add a minimal environment variable setting system
