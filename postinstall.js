const printMessage = require("print-message");
let oppenCollective = `    ,*///*.                                       
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
                                                   ,*******,`
printMessage(
    [oppenCollective + "\nWelcome to HISP TANZANIA , this is A collection of reusable complex DHIS2 react ui components.",
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
        printFn: function (message) {
            process.stdout.write(message);
        },
    }
);