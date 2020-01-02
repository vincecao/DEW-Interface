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

``` python
cd backend
python api.py
```

### Parser API

Take an input string (behavior) and return the actors, triggers, actions, emit events and wait times. This can be used for auto completing the actors list.

#### Request
| Name | Value |
| --- | --- |
| Path | `/hlb/parse` |
| Verb | PUT |
| Body/Parameters | JSON: `{Scenario, Constraints, ParseType}` |

#### Response
| Name | Value |
| --- | --- |
| Status | `200` |
| Body | JSON: `{_id, parsedScenario : tuple((TODO: actors), trigger events, actions, emit events, wait time), parsedConstraints: tuple(constraint type, target, value)}`|

### generateNS API (in progress)

This API takes the behavior, constraints and actors and return a NS file which can be used in deterlab.

#### Request
| Name | Value |
| --- | --- |
| Path | `/hlb/generateNs` |
| Verb | PUT |
| Body | JSON: `{Actors, Scenario, Constraints, Bindings}` |

#### Response
| Name | Value |
| --- | --- |
| Status | `200` |
| Body | DEW contents as a return File, `returnGenerate.ns` |

### Translator API

Takes a file as an input and returns the dew format

#### Request
| Name | Value |
| --- | --- |
| Path | `/hlb/translate/:format/:returnType`,  `format` can be bash, magi, go etc., `returnType` can be dew & json |
| Verb | PUT |
| Body | Script File(e.g. `runall.sh`), which needs to be converted to DEW |

#### Response
| Name | Value |
| --- | --- |
| Status | `200` |
| Body(returnType: `json`) | JSON: `{InputFileContent}`, contents as a json |
| Body(returnType: `dew`) | Dew contents as a return file, `returnTranslator.dew` |

### Exception handling
``` json
{
  "_id": "uuid",
  "errors": "error msg"
}
```
| Error msg |
| --- |
| Not Vaild Format, should be bash, magi or go. |
| Not Vaild ReturnType, should be dew or json. |
| Not Vaild File. |
| File is empty. |
| Can not read from server. |
| Out of bounds: {name}, has size of: {len(value)}, but should be between {expected_min} and {expected_max}. |
| Unexpected field: {name}. |
| Missing value: {name}. |
| Not find correct api request url. |
