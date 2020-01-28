"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = refetch;
Object.defineProperty(exports, "typesQuery", {
  enumerable: true,
  get: function get() {
    return _typesQuery.default;
  }
});

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = require("@apollo/client");

var _getSchemaTypes = _interopRequireDefault(require("./getSchemaTypes"));

var _doesQueryContain = _interopRequireDefault(require("./doesQueryContain"));

var _typesQuery = _interopRequireDefault(require("./typesQuery"));

function normalizePredicate(predicate, idField) {
  if (typeof predicate === 'function') return predicate;
  var ids = predicate;
  if (Array.isArray(ids)) ids = new Set(ids);else if (!(ids instanceof Set)) ids = new Set([ids]);
  return function (data) {
    return ids.has(data[idField]);
  };
}

function every(array, predicate) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _elem = _step.value;
      if (!predicate(_elem)) return false;
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

  return true;
}

var typesPromise = null;

function refetch(_x, _x2, _x3, _x4) {
  return _refetch.apply(this, arguments);
}

function _refetch() {
  _refetch = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(client, typenameOrTerms, predicate, idField) {
    var types, terms, queries, promises, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2, _ret;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return refetch.fetchTypeMetadata(client);

          case 2:
            types = _context3.sent;

            if (!(typeof typenameOrTerms === 'string')) {
              _context3.next = 7;
              break;
            }

            terms = [[typenameOrTerms, predicate, idField]];
            _context3.next = 12;
            break;

          case 7:
            if (!Array.isArray(typenameOrTerms)) {
              _context3.next = 11;
              break;
            }

            terms = typenameOrTerms;
            _context3.next = 12;
            break;

          case 11:
            throw new Error("invalid typename or terms: ".concat(typenameOrTerms));

          case 12:
            queries = client.queryManager.queries;
            promises = [];
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context3.prev = 17;

            _loop = function _loop() {
              var query = _step2.value;
              var document = query.document,
                  observableQuery = query.observableQuery;
              if (!observableQuery) return "continue";
              var data = void 0;
              var currentResult = observableQuery.getCurrentResult();
              if (currentResult) data = currentResult.data;

              if (every(terms, function (_ref3) {
                var _ref4 = (0, _slicedToArray2.default)(_ref3, 3),
                    typename = _ref4[0],
                    predicate = _ref4[1],
                    idField = _ref4[2];

                return (0, _doesQueryContain.default)(document, types, typename, data, predicate != null ? normalizePredicate(predicate, idField || 'id') : null);
              })) {
                console.log(observableQuery);
                promises.push(observableQuery.refetch());
              }
            };

            _iterator2 = queries.values()[Symbol.iterator]();

          case 20:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context3.next = 27;
              break;
            }

            _ret = _loop();

            if (!(_ret === "continue")) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt("continue", 24);

          case 24:
            _iteratorNormalCompletion2 = true;
            _context3.next = 20;
            break;

          case 27:
            _context3.next = 33;
            break;

          case 29:
            _context3.prev = 29;
            _context3.t0 = _context3["catch"](17);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t0;

          case 33:
            _context3.prev = 33;
            _context3.prev = 34;

            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }

          case 36:
            _context3.prev = 36;

            if (!_didIteratorError2) {
              _context3.next = 39;
              break;
            }

            throw _iteratorError2;

          case 39:
            return _context3.finish(36);

          case 40:
            return _context3.finish(33);

          case 41:
            _context3.next = 43;
            return promises;

          case 43:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[17, 29, 33, 41], [34,, 36, 40]]);
  }));
  return _refetch.apply(this, arguments);
}

refetch.fetchTypeMetadata =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(client) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!typesPromise) {
              refetch.setTypeMetadata(client.query({
                query: _typesQuery.default
              }));
            } // istanbul ignore next


            if (typesPromise) {
              _context.next = 3;
              break;
            }

            throw new Error('this should never happen');

          case 3:
            _context.next = 5;
            return typesPromise;

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x5) {
    return _ref.apply(this, arguments);
  };
}();

refetch.setTypeMetadata = function (metadata) {
  typesPromise = (0, _getSchemaTypes.default)(
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return metadata;

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
};