//Set URL Address to 'url' as a constant
const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//Set up initial Screen Output
function init(){ 

    // Pull Json data
    d3.json(url).then((data) => {   
        console.log(data);

        // Set Drop_Down_Menu variable to DropDown on Webpage    
        let Drop_Down_Menu = d3.select('#selDataset');
     
        // Set Subject_ID_Numbers to Array of ID Numbers labeled names
        let Subject_ID_Numbers = data.names;
         
        // Loop through Subject_ID_Numbers and append each ID to the DropDown Menu
        Subject_ID_Numbers.forEach((ID_Number) => {           //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach 
            Drop_Down_Menu.append('option').text(ID_Number).property('value');
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
        let Selected_Item = Selected_MetaData[0]
           
        // Clear out previous output
        d3.select('#sample-metadata').html('');
     
        // Set MetaData_Info to hold the variables of chosen ID
        let MetaData_Info = Object.entries(Selected_Item);    //from https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object/684692#684692
           
        // Loop through MetaData for chosen ID and output data
        MetaData_Info.forEach(([id,info]) => {                     
           d3.select('#sample-metadata').append('h6').text(`${id}: ${info}`);
           });
    });
}
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Make Bar Chart
function Bar_Chart(ID_Value) {

    // Pull Json data
    d3.json(url).then((data) => {
        console.log(data);

        // Set samples as on array of data.samples objects
        let Data_Samples = data.samples;

        // Filter data and save as 'Selected_ID' where sample.id = user selected ID_Value which was passed in as parameter
        let Selected_ID = Data_Samples.filter((Data_Samples) => Data_Samples.id === ID_Value);

        // Assign first item to 'Selected_Item' for use in Bar Chart creation 
        let Selected_Item = Selected_ID[0];
        
        // Assemble 'trace' for Bar Chart
        let trace = {
            // Slice first 10 otu values and arrange in decenting order
            x: Selected_Item.sample_values.slice(0,10).reverse(),
            y: Selected_Item.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: Selected_Item.otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        };

        // Assign 'Bar_Data' to trace array
        let Bar_Data = [trace];
        
        // Use Plotly to create Bar Chart
        Plotly.newPlot('bar', Bar_Data);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Make Bubble Chart
function Bubble_Chart(ID_Value) {

    // Pull Json data
    d3.json(url).then((data) => {
        console.log(data);

        // Set samples as on array of data.samples objects
        let Data_Samples = data.samples;
    
        // Filter data and save as 'Selected_ID' where sample.id = user selected ID_Value which was passed in as parameter
        let Selected_ID = Data_Samples.filter((Data_Samples) => Data_Samples.id === ID_Value);
    
        // Assign first item to 'Selected_Item' for use in Bubble Chart creation 
        let Selected_Item = Selected_ID[0];
        
        // Assemble 'trace' for Bubble Chart
        let trace = {
            x: Selected_Item.otu_ids,
            y: Selected_Item.sample_values,
            text: Selected_Item.otu_labels,
            mode: 'markers',                          //from https://stackoverflow.com/questions/77179677/adding-hover-text-over-bubble-chart-in-plotly-js
            marker: {
                size: Selected_Item.sample_values,
                color: Selected_Item.otu_ids,
            },
        };
    
        // Assign 'Bubble_Data' to trace array
        let Bubble_Data = [trace];

        // Assign 'layout' to hold title and place it below Bubble Chart 
        let layout = {
            xaxis: {title: 'OTU ID'}          //from https://plotly.com/javascript/axes/
        };
    
        // Use Plotly to create Bubble Chart
        Plotly.newPlot('bubble', Bubble_Data, layout);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create Handler for when the DropDown Target changes 
function optionChanged(New_ID){

    ID_Demographics(New_ID);
    Bar_Chart(New_ID);
    Bubble_Chart(New_ID)
    
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

init();