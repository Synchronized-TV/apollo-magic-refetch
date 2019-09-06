'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = doesQueryContain

var _getPotentialAncestors = _interopRequireDefault(
  require('./getPotentialAncestors')
)

function doesQueryContain(document, types, typename, data, predicate) {
  var targetType = types[typename]
  if (!targetType) throw new Error('type not found: '.concat(typename))
  var potentialAncestors = (0, _getPotentialAncestors.default)(targetType)

  function doesNodeContain(node, data, type) {
    if (type === targetType) {
      if (!predicate || predicate(data)) return true
    }

    if (!type.name) return false
    var ancestorEntry = potentialAncestors.get(type)
    if (!ancestorEntry) return false
    var selectionSet = node.selectionSet

    if (selectionSet) {
      var _iteratorNormalCompletion = true
      var _didIteratorError = false
      var _iteratorError = undefined

      try {
        for (
          var _iterator = selectionSet.selections[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          var selection = _step.value
          var alias = selection.alias
          var name = selection.name
          if (!name) continue
          if (!ancestorEntry.fields.has(name.value)) continue
          var fields = type.fields
          if (!fields) continue
          var field = fields[name.value]
          if (!field) continue
          var innerType = field.type
          var list = false

          while (innerType.ofType) {
            if (innerType.kind === 'LIST') list = true
            innerType = innerType.ofType
          }

          var innerData = data ? data[alias ? alias.value : name.value] : null
          if (predicate && innerData == null) continue

          if (predicate && list) {
            if (!Array.isArray(innerData)) continue
            var _iteratorNormalCompletion2 = true
            var _didIteratorError2 = false
            var _iteratorError2 = undefined

            try {
              for (
                var _iterator2 = innerData[Symbol.iterator](), _step2;
                !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next())
                  .done);
                _iteratorNormalCompletion2 = true
              ) {
                var element = _step2.value

                if (doesNodeContain(selection, element, innerType)) {
                  return true
                }
              }
            } catch (err) {
              _didIteratorError2 = true
              _iteratorError2 = err
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return()
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2
                }
              }
            }
          } else {
            if (doesNodeContain(selection, innerData, innerType)) {
              return true
            }
          }
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

    return false
  }

  var _iteratorNormalCompletion3 = true
  var _didIteratorError3 = false
  var _iteratorError3 = undefined

  try {
    for (
      var _iterator3 = document.definitions[Symbol.iterator](), _step3;
      !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
      _iteratorNormalCompletion3 = true
    ) {
      var node = _step3.value

      if (doesNodeContain(node, data, types.Query)) {
        return true
      }
    }
  } catch (err) {
    _didIteratorError3 = true
    _iteratorError3 = err
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return()
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3
      }
    }
  }

  return false
}
