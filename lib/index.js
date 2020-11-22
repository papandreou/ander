var data = require('../data/all.json');

// Replace - with _ and convert to lower case: en-GB => en_gb
function normalizeLocaleId(localeId) {
  return localeId && localeId.replace(/-/g, '_').toLowerCase();
}

function renderPattern(pattern, placeholderValues) {
  return pattern.replace(
    /\{(\d+)\}|([^{]+)/g,
    function ($0, placeholderNumber, text) {
      return text || placeholderValues[placeholderNumber];
    }
  );
}

function findPatterns(localeId) {
  localeId = localeId || 'en_us';
  var normalizedLocaleId = normalizeLocaleId(localeId);
  if (data[normalizeLocaleId]) {
    return data[normalizeLocaleId];
  }
  var strippedLocaleId = normalizedLocaleId;
  do {
    strippedLocaleId = strippedLocaleId.replace(/_[^_]*$/, '');
    if (data[strippedLocaleId]) {
      return data[strippedLocaleId];
    }
  } while (/_/.test(strippedLocaleId));
  return data.root;
}

function ander(list, localeId) {
  localeId = localeId || 'en_us';
  var patterns = findPatterns(localeId);
  switch (list.length) {
    case 0:
      return '';
    case 1:
      return list[0];
    case 2:
      if ('2' in patterns) {
        return renderPattern(patterns['2'], list);
      }
    /* falls through */
    default:
      var str = renderPattern(patterns.end || '{0}, {1}', list.slice(-2));
      for (var i = list.length - 3; i >= 0; i -= 1) {
        str = renderPattern(
          (!i && patterns.start) || patterns.middle || '{0}, {1}',
          [list[i], str]
        );
      }
      return str;
  }
}

module.exports = ander;
