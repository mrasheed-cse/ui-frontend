import { Component } from '@angular/core';

@Component({
    templateUrl: 'widgets.component.html',
    standalone: false
})
export class WidgetsComponent {

  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A',
      backgroundColor: this.brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'transparent'
        },
        ticks: {
          font: { size: 2 },
          color: 'transparent',
        }
      },
      y: {
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      },
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    }
  };
  public lineChart1Legend = false;
  public lineChart1Type: any = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A',
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'transparent'
        },
        ticks: {
          font: { size: 2 },
          color: 'transparent',
        }
      },
      y: {
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      },
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    }
  };
  public lineChart2Legend = false;
  public lineChart2Type: any = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    }
  };
  public lineChart3Legend = false;
  public lineChart3Type: any = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        barPercentage: 0.6,
      },
      y: {
        display: false
      }
    }
  };
  public barChart1Legend = false;
  public barChart1Type: any = 'bar';

  // lineChart4
  public lineChart4Data: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      borderWidth: 2
    }
  ];
  public lineChart4Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public lineChart4Options: any = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      }
    },
    elements: { point: { radius: 0 } }
  };
  public lineChart4Legend = false;
  public lineChart4Type: any = 'line';


  // barChart2
  public barChart2Data: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A',
      backgroundColor: 'rgba(0,0,0,.2)',
      borderWidth: 0
    }
  ];
  public barChart2Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChart2Options: any = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        barPercentage: 0.6,
      },
      y: {
        display: false,
        ticks: {
          beginAtZero: true,
        }
      }
    }
  };
  public barChart2Legend = false;
  public barChart2Type: any = 'bar';


  // barChart3
  public barChart3Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChart3Options: any = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };
  public barChart3PrimaryData: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A',
      backgroundColor: this.brandPrimary,
      borderColor: 'transparent',
      borderWidth: 1
    }
  ];
  public barChart3DangerData: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A',
      backgroundColor: this.brandDanger,
      borderColor: 'transparent',
      borderWidth: 1
    }
  ];
  public barChart3SuccessData: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A',
      backgroundColor: this.brandSuccess,
      borderColor: 'transparent',
      borderWidth: 1
    }
  ];
  public barChart3Legend = false;
  public barChart3Type: any = 'bar';


  // lineChart5
  public lineChart5Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart5Options: any = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      }
    },
    elements: { point: { radius: 0 } }
  };
  public lineChart5InfoData: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A',
      backgroundColor: 'transparent',
      borderColor: this.brandInfo,
      borderWidth: 2
    }
  ];
  public lineChart5SuccessData: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A',
      backgroundColor: 'transparent',
      borderColor: this.brandInfo,
      borderWidth: 2
    }
  ];
  public lineChart5WarningData: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A',
      backgroundColor: 'transparent',
      borderColor: this.brandWarning,
      borderWidth: 2
    }
  ];
  public lineChart5Legend = false;
  public lineChart5Type: any = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
