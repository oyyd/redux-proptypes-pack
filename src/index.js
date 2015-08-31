export default function packCreator(disabled) {
  return function pack(reducer, validator) {
    if (Boolean(disabled) || typeof validator !== 'function') {
      return reducer;
    }

    return function packedReducer(...args) {
      const newState = reducer(...args);
      const result = validator(
        {state: newState},
        'state',
        reducer.name,
        'prop'
      );

      if (result instanceof Error) {
        console.warn(`Redux state: ${result.message}`);
      }

      return newState;
    };
  };
}
