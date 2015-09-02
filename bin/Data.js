/// <reference path="IVehicle" />
/**
* @module FleetManagement
*/
var FleetManagement;
(function (FleetManagement) {
    var Data = (function () {
        function Data() {
        }
        /**
        * Populates the application with the initial data.
        * @author Marcelo Camargo
        * @since 2015/09/02
        * @return void
        */
        Data.setInitialData = function () {
            Data.vehicles = [
                {
                    fuel: 2 /* Flex */,
                    image: null,
                    trademark: "Volkswagen",
                    model: "Gol",
                    plate: "FFF-5498"
                }, {
                    fuel: 0 /* Gas */,
                    image: null,
                    trademark: "Volkswagen",
                    model: "Fox",
                    plate: "FOX-4125"
                }, {
                    fuel: 1 /* Alcohol */,
                    image: [
                        "https://lh4.googleusercontent.com/­_AhcQKHf7rM/AAAAAAAAAAI/",
                        "AAAAAAAAAAA/QM­pqL4NYaE/s48­c­k­no/photo.jpg"
                    ].join(""),
                    trademark: "Volkswagen",
                    model: "Fusca",
                    plate: "PAI-4121"
                }];
        };
        Data.vehicles = [];
        return Data;
    })();
    FleetManagement.Data = Data;
})(FleetManagement || (FleetManagement = {}));
