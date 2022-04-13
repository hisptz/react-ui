const printMessage = require("print-message");
const openCollective = `    ,*///*.                                       
                              *((((((((((/((,                                   
                           ,((/(((((((((((((((/.                                
                         /(((((((((((((((((((((((,                              
                      .((((((((((((((((((((((((((((/                            
                    /(((((((((((((((((((((((((((((((((,                         
                 .(((((((((((((((((((((((((((((((((((((((.                      
               *(((((((((((((((((((((((((((((((((((((((((((,                    
             .((((((*  /(((,  (/  /((.     ./*      ./((((((/                   
             /((((((*  /(((,  (/  ((.  *(((*.  ,(((*  (((((((,                  
             /((((((*  ....   (*  /(((/,.  .(*       *(((((((,                  
             .((((((*  /(((,  (/  //   ..  .(*  //(((((((/(((                   
               /((((((((((((((((##((((((((((((((((/  ,***,.                     
                 *((((((((((((((((((((((((((((((, ,*********,                   
                   .(((((((((((((((((((((((((/  ***************.                
                      *((((((((((((((((((((* .*****((************,              
                        .(((((((((((((((((( .*****/((//***/((*****,             
                           *#(((((((((((((( .******((***/((*******,             
                             .((((((((((((((. ,*****//**//////**,               
                                 ,/(((((/,      .*************.                 
                                                   ,*******,`;
printMessage(
  [openCollective + "\nWelcome to HISP TANZANIA's React UI library , a collection of reusable complex DHIS2 react UI components."
  ], {
      border: false,
      color: "green",
      borderColor: "blue",
      borderSymbol: "|",
      sideSymbol: "|",
      leftTopSymbol: "L",
      leftBottomSymbol: "r",
      rightBottomSymbol: "",
      marginTop: 2,
      marginBottom: 3,
      paddingTop: 0,
      paddingBottom: 0,
      printFn: function(message) {
          process.stdout.write(message);
      }
  }
);
