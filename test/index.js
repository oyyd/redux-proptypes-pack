import chai from 'chai';
import packCreator from '../src/index';
import {PropTypes} from 'react';
import sinon from 'sinon';

const {assert} = chai;
let spy = null;

describe('redux-proptypes-pack', () => {
  describe('packCreator', () => {
    beforeEach(() => {
       spy = sinon.spy(console, 'warn');
    });

    afterEach(() => {
       console.warn.restore();
    });

    it('should return a new reducer', () => {
      const pack = packCreator();
      function reducer() {
        return 0;
      }
      const packedReducer = pack(reducer, PropTypes.number);
      assert.notStrictEqual(reducer, packedReducer);
    });

    it('should return the original reducer when disabled', () => {
      const pack = packCreator(true);
      function reducer() {
        return 0;
      }
      const packedReducer = pack(reducer, PropTypes.number);

      assert.strictEqual(reducer, packedReducer);
    });

    it('should return the original reducer when passed non-function validator', () => {
      const pack = packCreator(true);
      function reducer() {
        return 0;
      }
      const reducer1 = pack(reducer, null);
      assert.strictEqual(reducer, reducer1);
      const reducer2 = pack(reducer, undefined);
      assert.strictEqual(reducer, reducer2);
      const reducer3 = pack(reducer, '');
      assert.strictEqual(reducer, reducer3);
      const reducer4 = pack(reducer, 1);
      assert.strictEqual(reducer, reducer4);
    });

    it('should return the original reducer when validator is not a function', () => {
      const pack = packCreator(true);
      function reducer() {
        return 0;
      }
      const packedReducer = pack(reducer, null);
      assert.strictEqual(reducer, packedReducer);
    });

    it('should call `console.warn` when failed the validating', () => {
      const pack = packCreator();
      function reducer() {
        return 0;
      }
      const packedReducer = pack(reducer, PropTypes.string);
      packedReducer('test');
      assert.ok(spy.calledOnce);
    });

    it('should call `console.warn` when failed the validating', () => {
      const pack = packCreator();
      function testReducer() {
        return {
          count: ''
        };
      }
      const packedReducer = pack(testReducer, PropTypes.shape({
        count: PropTypes.number
      }));
      packedReducer(null);
      assert.ok(spy.calledOnce);
    });

    it('should call `console.warn` when failed the validating', () => {
      const pack = packCreator();
      function testReducer() {
        return {
          type: 3
        };
      }
      const packedReducer = pack(testReducer, PropTypes.shape({
        type: PropTypes.oneOf([0,1,2])
      }));
      packedReducer(null);
      assert.ok(spy.calledOnce);
    });
  });
});
