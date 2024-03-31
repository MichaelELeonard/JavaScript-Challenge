const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//Set up initial Screen Output
function init(){ 

    // Pull Json data
    d3.json(url).then((data) => {   
        console.log(data);

    // Set Drop_Down_Menu variable to DropDown on Webpage    
    let Drop_Down_Menu = d3.select("#selDataset");
     
    // Set Subject_ID_Numbers to Array of ID Numbers labeled names
    let Subject_ID_Numbers = data.names;
         
    // Loop through Subject_ID_Numbers and append each ID to the DropDown Menu
    Subject_ID_Numbers.forEach((ID_Number) => {                //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach 
        Drop_Down_Menu.append("option").text(ID_Number).property("value");
        });
      
    // Set First_ID to the first ID value in Subject_ID_Numbers Array    
    let First_ID = Subject_ID_Numbers[0];    
  
    // Pass First First_ID to functions for initial output
    ID_Demographics(First_ID)
    Bar_Chart(First_ID)
    Bubble_Chart(First_ID)
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Make Demographics Panel
function ID_Demographics(ID_Value) {

 // Pull Json data
    d3.json(url).then((data) => {   
        console.log(data);
    

        // Set MetaData to Array of data.metadata
        let MetaData = data.metadata;
        
        // Set Selected_MetaData to filtered MetaData by matching ID Values
        let Selected_MetaData = MetaData.filter((Data) => Data.id == ID_Value);
      
        // Set Selected_ID to key in the filtered MetaData
        let Selected_ID = Selected_MetaData[0]
        
        // Clear out previous output
        d3.select("#sample-metadata").html("");
  
        // Set MetaData_Info to hold the variables of chosen ID
        let MetaData_Info = Object.entries(Selected_ID);
        
        // Loop through MetaData array info and output data
        MetaData_Info.forEach(([id,info]) => {                     
            d3.select("#sample-metadata").append("h5").text(`${id}: ${info}`);
        });
    });
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Make Bar Chart
function Bar_Chart(ID_Value) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(data);

        // An array of sample objects
        let samples = data.samples;

        // Filter data where id = selected value 
        let filteredData = samples.filter((sample) => sample.id === ID_Value);

        // Assign the first object to obj variable
        let obj = filteredData[0];
        
        // Trace for the data for the horizontal bar chart
        let trace = [{
            // Slice the top 10 otus
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "rgb(166,172,237)"
            },
            orientation: "h"
        }];
        
        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("bar", trace);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Make Bubble Chart
function Bubble_Chart(ID_Value) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(data);

        // An array of sample objects
        let samples = data.samples;
    
        // Filter data where id = selected value 
        let filteredData = samples.filter((sample) => sample.id === ID_Value);
    
        // Assign the first object to obj variable
        let obj = filteredData[0];
        
        // Trace for the data for the bubble chart
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Sunset"
            }
        }];
    
        // Apply the x-axis lengend to the layout
        let layout = {
            xaxis: {title: "OTU ID"}
        };
    
        // Use Plotly to plot the data in a bubble chart
        Plotly.newPlot("bubble", trace, layout);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// //define the function when the dropdown detects a change (function name as defined in index.html)
function optionChanged(New_ID){

    ID_Demographics(New_ID);
    Bar_Chart(New_ID);
    Bubble_Chart(New_ID)
    
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

init();