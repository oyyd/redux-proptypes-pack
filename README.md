redux-proptypes-pack
=============

Use `React.PropTypes` in your redux apps.

```
npm install redux-proptypes-pack
```

## Usage

```js
// reducers.js
import React from 'react';
import packCreator from 'redux-proptypes-pack';

const {PropTypes} = React;
const pack = packCreator();

const initialState = {
  items: [{
    title: '',
    content: ''
  }]
};

const validator = PropTypes.shape({
  items: PropTypes.arrayOf(PropTypes.object)
});

function todoList(state = initialState, action){
  // ...
}

export default pack(todoList, validator);
```

Disable validating in your production environment.

```js
// reducers.js
import packCreator from 'redux-proptypes-pack';

const disabled = (process.env.NODE_ENV === 'production');

const pack = packCreator(disabled);
```

Then the `pack` function will simplely pass your reducers to Redux.

## API Reference

### `packCreator(disabled)`

####Arguments

`disabled`(Boolean): The returned `pack` function won't validate when the `disabled` is truthy.

####Returns

`pack`(Function):

### `pack(reducer, validator)`

####Arguments

`reducer`(Function): A redux [reducer](http://rackt.github.io/redux/docs/basics/Reducers.html).

`validator`(Function): A validtor form `React.PropTypes`.

## Run tests
```js
npm test
```
## License

MIT
