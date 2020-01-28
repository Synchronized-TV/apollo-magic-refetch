"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkTypes = linkTypes;
exports.default = getSchemaTypes;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function convertRawField(_ref) {
  var name = _ref.name,
      type = _ref.type;
  return {
    name: name,
    type: convertRawType(type)
  };
}

function convertRawFields(fields) {
  var convertedFields = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var field = _step.value;
      convertedFields[field.name] = convertRawField(field);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return convertedFields;
}

function convertRawType(_ref2) {
  var name = _ref2.name,
      kind = _ref2.kind,
      ofType = _ref2.ofType,
      fields = _ref2.fields;
  return {
    name: name,
    kind: kind,
    ofType: ofType ? convertRawType(ofType) : null,
    fields: fields ? convertRawFields(fields) : null
  };
}

function linkTypes(rawTypes) {
  var types = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = rawTypes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var rawType = _step2.value;
      var _name3 = rawType.name;

      if (_name3) {
        types[_name3] = convertRawType(rawType);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  function resolveType(type, parent) {
    var _type = type,
        name = _type.name,
        ofType = _type.ofType;
    if (name && types[name]) type = types[name];
    if (ofType) type.ofType = resolveType(ofType, parent);

    if (parent) {
      var _type2 = type,
          parents = _type2.parents;
      if (!parents) type.parents = parents = [];
      parents.push(parent);
    }

    return type;
  }

  for (var _name in types) {
    var type = types[_name];
    var fields = type.fields;

    if (fields) {
      for (var _name2 in fields) {
        var field = fields[_name2];
        field.type = resolveType(field.type, field);
        field.parent = type;
      }
    }
  }

  return types;
}

function getSchemaTypes(_x) {
  return _getSchemaTypes.apply(this, arguments);
}

function _getSchemaTypes() {
  _getSchemaTypes = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(fetchTypeMetadata) {
    var _ref3, types;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchTypeMetadata();

          case 2:
            _ref3 = _context.sent;
            types = _ref3.data.__schema.types;
            return _context.abrupt("return", linkTypes(types));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getSchemaTypes.apply(this, arguments);
}