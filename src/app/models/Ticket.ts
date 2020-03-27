export class Ticket {
    idTicket: number;
    idVehicle: String;
    fullName: String;
    startDate: string;
    endDate: string;
    nameFloor: String;
    nameOfPosition: String;
    ticketType: String;
    cost: String;

    constructor(idTicket: number,idVehicle: String,fullName: String,startDate: string,endDate: string,nameFloor: String,nameOfPosition: String,ticketType: String,cost: String) {
        this.idTicket = idTicket;
        this.idVehicle = idVehicle;
        this.fullName = fullName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.nameFloor = nameFloor;
        this.nameOfPosition = nameOfPosition;
        this.ticketType = ticketType;
        this.cost = cost;
    }

}