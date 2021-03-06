import {expect} from 'chai';
import Transformer from './../../lib/transformer';
const transformer = new Transformer({'obj-shorthand': true});

function test(script) {
  return transformer.run(script);
}

describe('Object shorthands', () => {
  it('should convert matching key-value entries to shorthand notation', () => {
    expect(test('({foo: foo})')).to.equal('({foo})');
  });

  it('should not convert non-matching key-value entries to shorthand notation', () => {
    expect(test('({foo: bar})')).to.equal('({foo: bar})');
  });

  it('should not convert numeric properties to shorthands', () => {
    expect(test('({10: 10})')).to.equal('({10: 10})');
  });

  // One might think we should also convert strings,
  // but there might be some explicit reason why author chose
  // to write his property names as strings,
  // like when using Advanced compilation mode of Google Closure Compiler,
  // where string keys signify that they should not be minified.
  it('should not convert string properties to shorthands', () => {
    expect(test('({"foo": foo})')).to.equal('({"foo": foo})');
  });
});
