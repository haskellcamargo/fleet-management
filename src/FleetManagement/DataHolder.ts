/// <reference path="IVehicle" />

/**
 * @module FleetManagement
 */
module FleetManagement {
  export class DataHolder {
    /**
     * The vehicle list.
     * @type Array<IVehicle>
     */
    private vehicles: Array<IVehicle> = [];
    /**
     * A list for optimization while searching for vehicle ocurrences.
     * @type Array<string>
     */
    private plateList: Array<string> = [];

    /**
     * Entry point of the data holder, which carries information about the
     * current vehicles.
     * @author Marcelo Camargo
     * @constructor
     * @since 2015/09/02
     * @return DataHolder
     */
    public constructor() {
      this.setInitialData();
    }

    /**
     * Gives the size of the vehicles list
     * @return number
     */
    public getSize(): number {
      return this.vehicles.length;
    }

    /**
     * Returns the list of vehicles.
     * @author Marcelo Camargo
     * @return Array<IVehicle>
     */
    public getVehicles(): Array<IVehicle> {
      return this.vehicles;
    }

    /**
     * Adds a vehicle to the vehicles list. Returns true wheter the vehicle
     * has been inserted or false if the vehicle cannot be inserted because
     * of a repeated plate.
     * @author Marcelo Camargo
     * @param vehicle: IVehicle
     * @return void
     */
    public addVehicle(vehicle: IVehicle): void {
      try {
        this.validateVehicle(vehicle);
        this.plateList.push(vehicle.plate);
        this.vehicles.push(vehicle);
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * Finds a vehicle by its plate.
     * @author Marcelo Camargo
     * @param plate: string
     * @return IVehicle
     */
    public getVehicleByPlate(plate: string): IVehicle {
      if (this.plateList.indexOf(plate) === -1) {
        return null;
      }

      for (var i: number = 0, len: number = this.vehicles.length;
        i < len;
        i++) {
        if (this.vehicles[i].plate === plate) {
          return this.vehicles[i];
        }
      }
      return null;
    }

    /**
     * Removes a vehicle by plate.
     * @author Marcelo Camargo
     * @param plate: string
     * @return void
     */
    public removeVehicleByPlate(plate: string): void {
      if (this.plateList.indexOf(plate) === -1) {
        console.log("Placa inexistente");
        return;
      }

      for (var i: number = 0, len: number = this.vehicles.length; i < len; i++) {
        if (this.vehicles[i].plate === plate) {
          this.vehicles.splice(i, 1);
          this.plateList.splice(this.plateList.indexOf(plate), 1);
          return;
        }
      }
    }

    /**
     * A serie of validations to check for format errors.
     * @author Marcelo Camargo
     * @since 2015/09/02
     * @throws Error
     * @return void
     */
    private validateVehicle(
      vehicle: IVehicle,
      validatePlate: boolean = true
    ): void {
      if (validatePlate && this.plateList.indexOf(vehicle.plate)) {
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
    }

    /**
     * Populates the application with the initial data.
     * @author Marcelo Camargo
     * @since 2015/09/02
     * @return void
     */
    private setInitialData(): void {
      this.vehicles = [{
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
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fusca_1500.jpg",
        trademark: "Volkswagen",
        model: "Fusca",
        plate: "PAI-4121"
      }];

      this.plateList = [
        "FFF-5498", "FOX-4125", "PAI-4121"
      ];
    }
  }
}
