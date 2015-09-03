/// <reference path="DataHolder" />
/// <reference path="IField" />

/**
 * @module FleetManagement
 */
module FleetManagement {
  export class Main {
    static dataset: HTMLDivElement =
      <HTMLDivElement>document.getElementById("dataset");
    static search: HTMLInputElement =
      <HTMLInputElement>document.getElementById("search");
    static paginator: HTMLDivElement =
      <HTMLDivElement>document.getElementById("paginator");
    static placeholder: Object = {
      volkswagen: "http://img1.wikia.nocookie.net/__cb20131206125409/logopedia/images/9/9f/Volkswagen56.png",
      ford: "http://seeklogo.com/images/F/Ford-logo-FAE532D2CC-seeklogo.com.gif",
      fiat: "http://s3.caradvice.com.au/wp-content/themes/caradvice/assets/img/showroom/fiat.png"
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
      this.renderPaginator(holder);
    }

    /**
     * Renders the paginator, with a limit of 5 elements.
     * @author Marcelo Camargo
     * @param holder: DataHolder
     * @return void
     */
    public static renderPaginator(holder: DataHolder): void {
      var pagesNumber: number = holder.getSize();
      pagesNumber = pagesNumber % 5 === 0
        ? pagesNumber / 5
        : parseInt((pagesNumber / 5).toString()) + 1;

      this.paginator.innerHTML = "";
      for (var i: number = 0; i < pagesNumber; i++) {
        var pager: HTMLButtonElement =
          <HTMLButtonElement>document.createElement("button");
        pager.className = "btn btn-default"
        pager.innerHTML = (i + 1).toString();
        pager.onclick = () => {
          this.render(holder, (i * 5) - 5);
        };
        this.paginator.appendChild(pager);
      }
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
          this.paginator.style.visibility = "hidden";
        } else {
          this.render(holder, (this.page * 5) - 5);
          this.paginator.style.visibility = "visible";
        }
      };
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

      var header: HTMLTableRowElement = document.createElement("tr");

      ["Image", "Plate", "Fuel", "Model", "Trademark", "Edit", "Delete"]
        .forEach((td: string) => {
          var elem: HTMLTableDataCellElement = this.td(td);
          elem.align = "center";
          header.appendChild(elem);
        })

      this.dataset.appendChild(header);
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
        this.onEdit(<HTMLTableRowElement>td.parentNode, vehicle, holder);
      };

      td.appendChild(button);

      return td;
    }

    /**
     * Opens a row to edition.
     * @author Marcelo Camargo
     * @param line: HTMLTableRowElement
     * @param vehicle: IVehicle
     * @param holder: DataHolder
     * @return void
     */
    public static onEdit(
      line: HTMLTableRowElement,
      vehicle: IVehicle,
      holder: DataHolder): void {
      // Fuel
      var currentFuel: string = (<HTMLTableDataCellElement>line.children[2]).innerHTML;
      var fuelField: HTMLSelectElement = document.createElement("select");
      ["Flex", "Alcohol", "Gas"].forEach((fuel: string) => {
        fuelField.appendChild((() => {
          var option: HTMLOptionElement =
            <HTMLOptionElement>document.createElement("option");
          option.value = fuel;
          option.innerHTML = fuel;
          if (fuel === currentFuel) {
            option.selected = true;
          }
          return option;
        })());
      });

      fuelField.className = "form-control";

      // Model
      var currentModel: string = (<HTMLTableDataCellElement>line.children[3]).innerHTML;
      var modelField: HTMLInputElement = document.createElement("input");
      modelField.type = "text";
      modelField.value = currentModel;
      modelField.required = true;
      modelField.className = "form-control";

      // Trademark
      var currentTrademark: string = (<HTMLTableDataCellElement>line.children[4]).innerHTML;
      var trademarkField: HTMLSelectElement = document.createElement("select");
      ["Volkswagen", "Ford", "Fiat"].forEach((trademark: string) => {
        trademarkField.appendChild((() => {
          var option: HTMLOptionElement =
            <HTMLOptionElement>document.createElement("option");
          option.value = trademark;
          option.innerHTML = trademark;
          if (trademark === currentFuel) {
            option.selected = true;
          }
          return option;
        })());
      });

      trademarkField.className = "form-control";

      (<HTMLTableDataCellElement>line.children[2]).innerHTML = "";
      (<HTMLTableDataCellElement>line.children[3]).innerHTML = "";
      (<HTMLTableDataCellElement>line.children[4]).innerHTML = "";
      (<HTMLTableDataCellElement>line.children[2]).appendChild(fuelField);
      (<HTMLTableDataCellElement>line.children[3]).appendChild(modelField);
      (<HTMLTableDataCellElement>line.children[4]).appendChild(trademarkField);

      // Transform buttons
      var confirmButton: HTMLButtonElement =
        <HTMLButtonElement>line.children[5].firstChild;
      confirmButton.innerHTML = "Confirm";
      confirmButton.className = "btn btn-success";
      confirmButton.onclick = () => {
        this.onConfirmEdit(line, vehicle, holder, {
          fuel: (() => {
            switch (fuelField.value) {
              case "Gas":
                return Fuel.Gas;
              case "Alcohol":
                return Fuel.Alcohol;
              default:
                return Fuel.Flex;
            }
          })(),
          model: modelField.value,
          trademark: trademarkField.value
        });
      }

      var cancelButton: HTMLButtonElement =
        <HTMLButtonElement>line.children[6].firstChild;
      cancelButton.innerHTML = "Cancel";
      cancelButton.onclick = () => {
        this.onCancelEdit(line, vehicle, holder);
      }
    }

    /**
     * When cancel button is pressed while in edition mode.
     * @author Marcelo Camargo
     * @param line: HTMLTableRowElement
     * @param vehicle: IVehicle
     * @param holder: DataHolder
     * @return void
     */
    public static onCancelEdit(
      line: HTMLTableRowElement,
      vehicle: IVehicle,
      holder: DataHolder
    ): void {
      (<HTMLTableDataCellElement>line.children[2]).innerHTML = this.getFuelName(vehicle.fuel);
      (<HTMLTableDataCellElement>line.children[3]).innerHTML = vehicle.model;
      (<HTMLTableDataCellElement>line.children[4]).innerHTML = vehicle.trademark;

      // Restore buttons
      line.removeChild(line.lastChild);
      line.removeChild(line.lastChild);

      line.appendChild(this.renderEditButton(vehicle, holder));
      line.appendChild(this.renderDeleteButton(vehicle, holder));
    }

    /**
     * When the user confirms the edition
     * @author Marcelo Camargo
     * @param line: HTMLTableRowElement
     * @param vehicle: IVehicle
     * @param holder: DataHolder
     * @param newData: IField
     * @return void
     */
    public static onConfirmEdit(
      line: HTMLTableRowElement,
      vehicle: IVehicle,
      holder: DataHolder,
      newData: IField
    ): void {
      vehicle.fuel = newData.fuel;
      vehicle.model = newData.model;
      vehicle.trademark = newData.trademark;
      vehicle.image = this.placeholder[newData.trademark.toLowerCase()];

      (<HTMLImageElement>(<HTMLTableDataCellElement>line.children[0]).firstChild).src = vehicle.image;
      (<HTMLTableDataCellElement>line.children[2]).innerHTML = this.getFuelName(vehicle.fuel);
      (<HTMLTableDataCellElement>line.children[3]).innerHTML = vehicle.model;
      (<HTMLTableDataCellElement>line.children[4]).innerHTML = vehicle.trademark;

      // Restore buttons
      line.removeChild(line.lastChild);
      line.removeChild(line.lastChild);

      line.appendChild(this.renderEditButton(vehicle, holder));
      line.appendChild(this.renderDeleteButton(vehicle, holder));
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
      var td: HTMLTableCellElement =
        <HTMLTableCellElement>document.createElement("td");

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
