/// <reference path="IMaybe" />
/// <reference path="Maybe" />
/**
* @module Monad
*/
var Monad;
(function (Monad) {
    var Just = (function () {
        function Just(value) {
            this.value = value;
        }
        Just.prototype.chain = function (fn) {
            return Monad.Maybe(fn(this.value));
        };
        return Just;
    })();
    Monad.Just = Just;
})(Monad || (Monad = {}));
