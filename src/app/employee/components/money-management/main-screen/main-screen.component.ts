import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ParkingPositionService } from 'src/app/services/parking-position.service';
import { TicketService } from 'src/app/services/ticket.service';
import { VehicleService } from 'src/app/services/vehicle.service'
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  public numberCustomer;
  public numberCar;
  public numberEmployee;
  public numberTicket;
  public numberPosition;
  public chartLegend = true;
  public chartLabels;
  public chartData ;
  public chartType = 'doughnut';
  public chartColors: any[] = [{ backgroundColor:["#44FF07", "#FED60A", "#FB0007", "#3700FF","#FB13F3","#7CDDDD"] }];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
  };
  public pieChartPlugins = [{
    afterLayout: function (chart) {
      chart.legend.legendItems.forEach(
        (label) => {
          let value = chart.data.datasets[0].data[label.index];

          label.text += ' ' + value;
          return label;
        }
      )
    }
  }];

  constructor(
    private router: Router,
    private customerService: CustomerService,
    public ticketService: TicketService,
    public vehicleService: VehicleService,
    public employeeService: EmployeeService,
    public parkingPositionService: ParkingPositionService
    ){}

  ngOnInit() {
    this.getAllCustomer();
    this.getAllEmployee();
    this.getAllParkingPosition();
    this.getAllTicket();
    this.getAllVehicle();
  }


  getAllParkingPosition() {
    this.parkingPositionService.getAllParkingPosition(0, 1, "").subscribe(
      data => {
        this.numberPosition = data.totalElements;
        console.log(data.totalElements + " àasa");
      },
      error => {
        if (error.status == 401) {
          alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
          this.router.navigateByUrl('/login')
        }
      }
    );
  };

  getAllTicket() {
    this.ticketService.getAllTicket(0, 1, "").subscribe(
      data => {
        this.numberTicket = data.totalElements;
        console.log(data.totalElements);
      },
      error => {
        if (error.status == 401) {
          alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
          this.router.navigateByUrl('/login')
        }
      }
    );
  };

  getAllCustomer() {
    this.customerService.getAllCustomer(0, 1, "").subscribe(
      data => {
        this.numberCustomer = data.totalElements;
        console.log(data.totalElements);
      },
      error => {
        if (error.status == 401) {
          alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
          this.router.navigateByUrl('/login')
        }
      }
    );
  };

  getAllEmployee() {
    this.employeeService.getAllEmployee(0, 1, "").subscribe(
      data => {
        this.numberEmployee = data.totalElements;
        console.log(data.totalElements);
      },
      error => {
        if (error.status == 401) {
          alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
          this.router.navigateByUrl('/login')
        }
      }
    );
  };

  getAllVehicle() {   
    this.vehicleService.getAllVehicle().subscribe(
      data => {
        let array = data;
        var result = array.reduce( (acc, o) => (acc[o.typeOfVehicle] = (acc[o.typeOfVehicle] || 0)+1, acc), {} );
        this.numberCar = data.length;
        this.chartLabels = Object.keys(result)
        this.chartData = Object.values(result)
        console.log(this.chartLabels)
        console.log(this.chartData)
        console.log(result);
      },
      error => {
        if (error.status == 401) {
          alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
          this.router.navigateByUrl('/login')
        }
      }
    );
  };

}
