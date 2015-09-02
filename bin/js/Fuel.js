/**
* @module FleetManagement
*/
var FleetManagement;
(function (FleetManagement) {
    (function (Fuel) {
        Fuel[Fuel["Gas"] = 0] = "Gas";
        Fuel[Fuel["Alcohol"] = 1] = "Alcohol";
        Fuel[Fuel["Flex"] = 2] = "Flex";
    })(FleetManagement.Fuel || (FleetManagement.Fuel = {}));
    var Fuel = FleetManagement.Fuel;
})(FleetManagement || (FleetManagement = {}));
