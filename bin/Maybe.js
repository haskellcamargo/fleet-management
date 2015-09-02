/// <reference path="Just" />
/// <reference path="Nothing" />
/**
* A small domain specific library for dealing with computations that may fail
* @module Monad
*/
var Monad;
(function (Monad) {
    function Maybe(data) {
        if (data instanceof Maybe) {
            return data;
        }

        return data === null || data === undefined ? new Monad.Nothing() : new Monad.Just(data);
    }
    Monad.Maybe = Maybe;
})(Monad || (Monad = {}));
