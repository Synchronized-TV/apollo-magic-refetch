'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = getPotentialAncestors
var cache = new Map()

function getPotentialAncestors(type) {
  var added = new Set()
  var cached = cache.get(type)
  if (cached) return cached
  var ancestors = new Map()

  function addType(type) {
    if (added.has(type)) return
    added.add(type)
    var parents = type.parents

    if (parents) {
      var _iteratorNormalCompletion = true
      var _didIteratorError = false
      var _iteratorError = undefined

      try {
        for (
          var _iterator = parents[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          var field = _step.value
          var name = field.name,
            parent = field.parent
          var ancestor = ancestors.get(parent)

          if (!ancestor) {
            ancestor = {
              fields: new Set(),
            }
            ancestors.set(parent, ancestor)
          }

          ancestor.fields.add(name)
          addType(parent)
        }
      } catch (err) {
        _didIteratorError = true
        _iteratorError = err
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return()
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError
          }
        }
      }
    }
  }

  addType(type)
  cache.set(type, ancestors)
  return ancestors
}
