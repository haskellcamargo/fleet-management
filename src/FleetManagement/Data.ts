/// <reference path="IVehicle" />

/**
 * @module FleetManagement
 */
module FleetManagement {
  export class Data {
    static vehicles: Array<IVehicle> = [];

    /**
     * Populates the application with the initial data.
     * @author Marcelo Camargo
     * @since 2015/09/02
     * @return void
     */
    static setInitialData(): void {
      Data.vehicles = [{
        fuel: Fuel.Flex,
        image: null,
        trademark: "Volkswagen",
        model: "Gol",
        plate: "FFF-5498"
      }, {
        fuel: Fuel.Gas,
        image: null,
        trademark: "Volkswagen",
        model: "Fox",
        plate: "FOX-4125"
      }, {
        fuel: Fuel.Alcohol,
        image: [
          "https://lh4.googleusercontent.com/­_AhcQKHf7rM/AAAAAAAAAAI/",
          "AAAAAAAAAAA/QM­pqL4NYaE/s48­c­k­no/photo.jpg"
        ].join(""),
        trademark: "Volkswagen",
        model: "Fusca",
        plate: "PAI-4121"
      }];
    }
  }
}
