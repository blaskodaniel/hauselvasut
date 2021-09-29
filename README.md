# Hausel Vasút (HV)

A projektnek két része van:

- Python webszerver (server)
- React webalkalmazás (website)

# Python webszerver

Ez az API réteg tart kapcsolatot a vonatvezérlő logika és a külvilág (kliensek) között.

## Install

```python
pip install Flask
pip install -U flask-cors
```

## Indítás:

Lépjünk be a **server** mappába és onnan adjuk ki a parancsokat:

```python
Linux:
export FLASK_APP=API

Windows:
set FLASK_APP=API
```

```python
flask run
```

# React webalkalmazás

Ezzel a webalkalmazással lehet hívni a webszerver API-t és vezérelni távolról a vonatot.

## Install

A webalkalmazás működéséhez szükséges, hogy a rendszeren telepítve legyen a [NodeJS](https://nodejs.org/dist/v14.17.6/node-v14.17.6-linux-x64.tar.xz) keretrendszer

Lépjünk be a **website** mappába és onnan adjuk ki a parancsokat:

```javascript
npm install
```

## Indítás

```javascript
npm start
```

## Környezeti változók

A _website/.env.development_ fájlban lehet megadni, hogy a python webserver milyen URL:PORT-on fut.

```
REACT_APP_BASEURL=http://localhost:5000
```
