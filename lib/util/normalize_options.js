/**
 * Normalize an object to match a struct.
 *
 * @param {String, Object} oid - The oid string or instance.
 * @return {Object} An Oid instance.
 */
function normalizeOptions(options, Ctor) {
  var instance = new Ctor();

  if (!options) {
    return instance;
  }

  Object.keys(options).forEach(function(key) {
    instance[key] = options[key];
  });
}

module.exports = normalizeOptions;