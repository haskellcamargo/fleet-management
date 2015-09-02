/// <reference path="IVehicle" />
/**
* @module FleetManagement
*/
var FleetManagement;
(function (FleetManagement) {
    var DataHolder = (function () {
        /**
        * Entry point of the data holder, which carries information about the
        * current vehicles.
        * @author Marcelo Camargo
        * @constructor
        * @since 2015/09/02
        * @return DataHolder
        */
        function DataHolder() {
            /**
            * The vehicle list.
            * @type Array<IVehicle>
            */
            this.vehicles = [];
            /**
            * A list for optimization while searching for vehicle ocurrences.
            * @type Array<string>
            */
            this.plateList = [];
            this.setInitialData();
        }
        /**
        * Adds a vehicle to the vehicles list. Returns true wheter the vehicle
        * has been inserted or false if the vehicle cannot be inserted because
        * of a repeated plate.
        * @author Marcelo Camargo
        * @param vehicle: IVehicle
        * @return void
        */
        DataHolder.prototype.addVehicle = function (vehicle) {
            try  {
                this.validateVehicle(vehicle);
                this.vehicles.push(vehicle);
            } catch (e) {
                console.log(e);
            }
        };

        /**
        * Finds a vehicle by its plate.
        * @author Marcelo Camargo
        * @param plate: string
        * @return Maybe<IVehicle>
        */
        DataHolder.prototype.getVehicleByPlate = function (plate) {
        };

        /**
        * A serie of validations to check for format errors.
        * @author Marcelo Camargo
        * @since 2015/09/02
        * @throws Error
        * @return void
        */
        DataHolder.prototype.validateVehicle = function (vehicle) {
            if (this.plateList.indexOf(vehicle.plate)) {
                throw new Error("There is already a vehicle with the same plate");
            }

            if (vehicle.plate.length !== 8) {
                throw new Error("Incorrect format of plate. Expected 8 chars");
            }

            if (vehicle.model === "") {
                throw new Error("Model cannot be empty");
            }

            if (vehicle.trademark === "") {
                throw new Error("Trademark cannot be empty");
            }
        };

        /**
        * Populates the application with the initial data.
        * @author Marcelo Camargo
        * @since 2015/09/02
        * @return void
        */
        DataHolder.prototype.setInitialData = function () {
            this.vehicles = [
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
        return DataHolder;
    })();
    FleetManagement.DataHolder = DataHolder;
})(FleetManagement || (FleetManagement = {}));
