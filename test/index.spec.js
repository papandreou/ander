const expect = require('unexpected');

const ander = require('../');

describe('ander', function () {
  it('should default to English and the "default" list pattern', function () {
    expect(ander(['foo', 'bar', 'quux']), 'to equal', 'foo, bar, and quux');
  });

  it('should render a list in Danish', function () {
    expect(ander(['foo', 'bar', 'quux'], 'da'), 'to equal', 'foo, bar og quux');
  });

  it('should support dashes in locale ids', function () {
    expect(
      ander(['foo', 'bar', 'quux'], 'en-US'),
      'to equal',
      'foo, bar, and quux'
    );
  });

  it('should strip off locale id suffixes until there is a match', function () {
    expect(
      ander(['foo', 'bar', 'quux'], 'en-US-FOO-BAR'),
      'to equal',
      'foo, bar, and quux'
    );
  });

  it('should fall back to root if no match is found', function () {
    expect(
      ander(['foo', 'bar', 'quux'], 'foobarquux'),
      'to equal',
      'foo, bar, quux'
    );
  });

  it('should support an "uncommon" locale id', function () {
    expect(
      ander(['foo', 'bar', 'quux'], 'cy'),
      'to equal',
      'foo, bar, a(c) quux'
    );
  });
});
