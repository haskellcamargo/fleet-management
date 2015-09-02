/// <reference path="Fuel" />

/**
 * @module FleetManagement
 */
module FleetManagement {
  export interface IVehicle {
    plate: string;
    image?: string;
    trademark: string;
    model: string;
    fuel?: Fuel;
  }
}