"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  {\n    __schema {\n      types {\n        name\n        fields {\n          name\n          type {\n            name\n            kind\n            ofType {\n              name\n              kind\n              ofType {\n                name\n                kind\n                ofType {\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _graphqlTag.default)(_templateObject());

exports.default = _default;