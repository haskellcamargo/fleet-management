/// <reference path="IMaybe" />
/**
* @module Monad
*/
var Monad;
(function (Monad) {
    var Nothing = (function () {
        function Nothing() {
        }
        Nothing.prototype.chain = function (_) {
            return this;
        };
        return Nothing;
    })();
    Monad.Nothing = Nothing;
})(Monad || (Monad = {}));
