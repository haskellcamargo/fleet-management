/// <reference path="DataHolder" />

/**
 * @module FleetManagement
 */
module FleetManagement {
  export class Main {
    static dataset: HTMLDivElement =
      <HTMLDivElement>document.getElementById("dataset");
    static search: HTMLInputElement =
      <HTMLInputElement>document.getElementById("search");
    static placeholder: Object = {
      volkswagen: "http://img1.wikia.nocookie.net/__cb20131206125409/logopedia/images/9/9f/Volkswagen56.png",
      ford: "",
      fiat: ""
    };
    static page: number = 1;

    /**
     * Entry-point.
     * @author Marcelo Camargo
     * @return void
     */
    public static init(): void {
      var holder: DataHolder = new DataHolder;
      this.render(holder);
      this.bindSearch(holder);
    }

    /**
     * Binds the search event.
     * @author Marcelo Camargo
     * @param holder: DataHolder
     * @return void
     */
    public static bindSearch(holder: DataHolder): void {
      this.search.onkeyup = () => {
        var content: string = this.search.value.toLowerCase().trim();
        if (content !== "") {
          var data = holder.getVehicles().filter((vehicle: IVehicle) => {
            return Main.getFuelName(vehicle.fuel).toLowerCase().indexOf(content) !== -1
              || vehicle.model.toLowerCase().indexOf(content) !== -1
              || vehicle.plate.toLowerCase().indexOf(content) !== -1
              || vehicle.trademark.toLowerCase().indexOf(content) !== -1;
          });
          this.render(holder, (this.page * 5) - 5, data);
        }
      };
      this.render(holder, (this.page * 5) - 5);
    }

    /**
     * Refreshes the layout based on the data in the memory
     * @author Marcelo Camargo
     * @param holder: DataHolder
     * @param from: number
     * @param searchData: Array<IVehicle>
     * @return void
     */
    public static render(
      holder: DataHolder,
      from: number = 0,
      searchData?: Array<IVehicle>
    ): void {
      var data: Array<IVehicle> = searchData
        ? searchData
        : holder.getVehicles().slice(from, from + 5);

      this.dataset.innerHTML = "";

      data.forEach((vehicle: IVehicle) => {
        var line: HTMLTableRowElement =
          <HTMLTableRowElement>document.createElement("tr");

        line.appendChild(this.getImage(vehicle.image, vehicle.trademark));
        line.appendChild(this.td(vehicle.plate));
        line.appendChild(this.td(this.getFuelName(vehicle.fuel)));
        line.appendChild(this.td(vehicle.model));
        line.appendChild(this.td(vehicle.trademark));
        line.appendChild(this.renderEditButton(vehicle, holder));
        line.appendChild(this.renderDeleteButton(vehicle, holder));

        this.dataset.appendChild(line);
      });
    }

    /**
     * Renders the button to edit an instance of vehicle.
     * @author Marcelo Camargo
     * @param vehicle: IVehicle
     * @param holder: DataHolder
     * @return HTMLTableDataCellElement
     */
    public static renderEditButton(
      vehicle: IVehicle,
      holder: DataHolder
    ): HTMLTableCellElement {
      var td: HTMLTableCellElement
        = <HTMLTableCellElement>document.createElement("td");

      var button: HTMLButtonElement =
        <HTMLButtonElement>document.createElement("button");

      button.innerHTML = "Edit";
      button.className = "btn btn-info";

      button.onclick = () => {

      };

      td.appendChild(button);

      return td;
    }

    /**
     * Renders the button to delete an instance of vehicle.
     * @author Marcelo Camargo
     * @param vehicle: IVehicle
     * @param holder: DataHolder
     * @return HTMLTableDataCellElement
     */
    public static renderDeleteButton(
      vehicle: IVehicle,
      holder: DataHolder
    ): HTMLTableCellElement {
      var td: HTMLTableCellElement
        = <HTMLTableCellElement>document.createElement("td");

      var button: HTMLButtonElement =
        <HTMLButtonElement>document.createElement("button");

      button.innerHTML = "Delete";
      button.className = "btn btn-danger";

      button.onclick = () => {
        holder.removeVehicleByPlate(vehicle.plate);
        Main.render(holder, (Main.page * 5) - 5);
      };

      td.appendChild(button);

      return td;
    }

    /**
     * Renders a table field.
     * @author Marcelo Camargo
     * @param text: string
     * @return HTMLTableDataCellElement
     */
    public static td(text: string): HTMLTableDataCellElement {
      var td: HTMLTableDataCellElement = document.createElement("td");
      td.innerHTML = text;
      return td;
    }

    /**
     * Gets the name of the fuel based on the enumerator.
     * @author Marcelo Camargo
     * @param fuel: Fuel
     * @return string
     */
    public static getFuelName(fuel: Fuel): string {
      switch (fuel) {
        case Fuel.Alcohol:
          return "Alcohol";
        case Fuel.Gas:
          return "Gas";
        default:
          return "Flex";
      }
    }

    /**
     * Shows the image of the car if it exists, otherwise shows the image of
     * the trademark.
     * @author Marcelo Camargo
     * @param image: string;
     * @param trademark: string;
     * @return HTMLTableDataCellElement
     */
    public static getImage(
      image: string,
      trademark: string
    ): HTMLTableDataCellElement {
      var td: HTMLTableCellElement =
        <HTMLTableCellElement>document.createElement("td");

      var img: HTMLImageElement =
        <HTMLImageElement>document.createElement("img");
      img.src = image !== null
        ? image
        : this.getDefaultImage(trademark);

      img.width = 100;
      img.height = 60;

      td.appendChild(img);
      return td;
    }

    /**
     * Uses a virtual table to search for the image as placeholder.
     * @author Marcelo Camargo
     * @param trademark: string;
     * @return string
     */
    public static getDefaultImage(trademark: string): string {
      trademark = trademark.toLowerCase();
      if (this.placeholder[trademark] !== undefined) {
        return this.placeholder[trademark];
      }
      return "resource/no-image.jpg";
    }
  }
}
