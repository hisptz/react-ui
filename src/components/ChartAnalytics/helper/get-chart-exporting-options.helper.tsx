export function getChartExportingOptions(xAxisCategories:any):any {
    return {
      scale: 3,
      chartOptions: {
        title: {
          style: {
            fontSize: "10px",
          },
        },
        subtitle: {
          style: {
            fontSize: "10px",
          },
        },
        xAxis: [
          {
            categories: xAxisCategories,
            labels: {
              rotation: 0,
              style: {
                fontSize: "8px",
                color: "#000000",
                textAlign: "center",
                textOverflow: "allow",
                width: 1,
                paddingBottom: "5px",
              },
            },
          },
        ],
      },
      buttons: {
        contextButton: {
          enabled: true,
        },
      },
    };
  }
  