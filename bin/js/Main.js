/// <reference path="DataHolder" />
/**
* @module FleetManagement
*/
var FleetManagement;
(function (FleetManagement) {
    var Main = (function () {
        function Main() {
        }
        /**
        * Entry-point.
        * @author Marcelo Camargo
        * @return void
        */
        Main.init = function () {
            var holder = new FleetManagement.DataHolder;
            this.render(holder);
            this.bindSearch(holder);
        };

        /**
        * Binds the search event.
        * @author Marcelo Camargo
        * @param holder: DataHolder
        * @return void
        */
        Main.bindSearch = function (holder) {
            var _this = this;
            this.search.onkeyup = function () {
                var content = _this.search.value.toLowerCase().trim();
                if (content !== "") {
                    var data = holder.getVehicles().filter(function (vehicle) {
                        return Main.getFuelName(vehicle.fuel).toLowerCase().indexOf(content) !== -1 || vehicle.model.toLowerCase().indexOf(content) !== -1 || vehicle.plate.toLowerCase().indexOf(content) !== -1 || vehicle.trademark.toLowerCase().indexOf(content) !== -1;
                    });
                    _this.render(holder, (_this.page * 5) - 5, data);
                }
            };
            this.render(holder, (this.page * 5) - 5);
        };

        /**
        * Refreshes the layout based on the data in the memory
        * @author Marcelo Camargo
        * @param holder: DataHolder
        * @param from: number
        * @param searchData: Array<IVehicle>
        * @return void
        */
        Main.render = function (holder, from, searchData) {
            var _this = this;
            if (typeof from === "undefined") { from = 0; }
            var data = searchData ? searchData : holder.getVehicles().slice(from, from + 5);

            this.dataset.innerHTML = "";

            data.forEach(function (vehicle) {
                var line = document.createElement("tr");

                line.appendChild(_this.getImage(vehicle.image, vehicle.trademark));
                line.appendChild(_this.td(vehicle.plate));
                line.appendChild(_this.td(_this.getFuelName(vehicle.fuel)));
                line.appendChild(_this.td(vehicle.model));
                line.appendChild(_this.td(vehicle.trademark));
                line.appendChild(_this.renderEditButton(vehicle, holder));
                line.appendChild(_this.renderDeleteButton(vehicle, holder));

                _this.dataset.appendChild(line);
            });
        };

        /**
        * Renders the button to edit an instance of vehicle.
        * @author Marcelo Camargo
        * @param vehicle: IVehicle
        * @param holder: DataHolder
        * @return HTMLTableDataCellElement
        */
        Main.renderEditButton = function (vehicle, holder) {
            var td = document.createElement("td");

            var button = document.createElement("button");

            button.innerHTML = "Edit";
            button.className = "btn btn-info";

            button.onclick = function () {
            };

            td.appendChild(button);

            return td;
        };

        /**
        * Renders the button to delete an instance of vehicle.
        * @author Marcelo Camargo
        * @param vehicle: IVehicle
        * @param holder: DataHolder
        * @return HTMLTableDataCellElement
        */
        Main.renderDeleteButton = function (vehicle, holder) {
            var td = document.createElement("td");

            var button = document.createElement("button");

            button.innerHTML = "Delete";
            button.className = "btn btn-danger";

            button.onclick = function () {
                holder.removeVehicleByPlate(vehicle.plate);
                Main.render(holder, (Main.page * 5) - 5);
            };

            td.appendChild(button);

            return td;
        };

        /**
        * Renders a table field.
        * @author Marcelo Camargo
        * @param text: string
        * @return HTMLTableDataCellElement
        */
        Main.td = function (text) {
            var td = document.createElement("td");
            td.innerHTML = text;
            return td;
        };

        /**
        * Gets the name of the fuel based on the enumerator.
        * @author Marcelo Camargo
        * @param fuel: Fuel
        * @return string
        */
        Main.getFuelName = function (fuel) {
            switch (fuel) {
                case 1 /* Alcohol */:
                    return "Alcohol";
                case 0 /* Gas */:
                    return "Gas";
                default:
                    return "Flex";
            }
        };

        /**
        * Shows the image of the car if it exists, otherwise shows the image of
        * the trademark.
        * @author Marcelo Camargo
        * @param image: string;
        * @param trademark: string;
        * @return HTMLTableDataCellElement
        */
        Main.getImage = function (image, trademark) {
            var td = document.createElement("td");

            var img = document.createElement("img");
            img.src = image !== null ? image : this.getDefaultImage(trademark);

            img.width = 100;
            img.height = 60;

            td.appendChild(img);
            return td;
        };

        /**
        * Uses a virtual table to search for the image as placeholder.
        * @author Marcelo Camargo
        * @param trademark: string;
        * @return string
        */
        Main.getDefaultImage = function (trademark) {
            trademark = trademark.toLowerCase();
            if (this.placeholder[trademark] !== undefined) {
                return this.placeholder[trademark];
            }
            return "resource/no-image.jpg";
        };
        Main.dataset = document.getElementById("dataset");
        Main.search = document.getElementById("search");
        Main.placeholder = {
            volkswagen: "http://img1.wikia.nocookie.net/__cb20131206125409/logopedia/images/9/9f/Volkswagen56.png",
            ford: "",
            fiat: ""
        };
        Main.page = 1;
        return Main;
    })();
    FleetManagement.Main = Main;
})(FleetManagement || (FleetManagement = {}));
