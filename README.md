# DEW Web Interface 

This web version of [DEW](https://steel.isi.edu/Projects/DEW/) interface is implemented by using [React](https://reactjs.org/)
and deployed in Zeit for testing purpose, **[Demo Page](https://dew-interface.now.sh/)**

Drag and drop feature is combined with [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

Used [Flask RESTful](https://flask-restful.readthedocs.io/en/latest/index.html) in Python as a backend.

## Features
- Add a new command line with return key
- Draging for re-ordering the command in behavior
- Inline Tab autocompelete with suggestions provided

## Build
Clone project, `npm install` or `yarn install`

See more script commands in `package.json`

- `npm run dev` for dev
- `npm run build` for build

## Backend
- `python backend/api.py`