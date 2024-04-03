MODULE 14 BELLY-BUTTON-CHALLENGE
The Assignment
In the Module 14 Belly-Button-Challenge we were tasked with building an interactive dashboard to explore the Belly Button Biodiversity.   Cataloged data of human navels microbes was downloaded from https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json and utilized to build the interactive dashboard so an end user can examine the data.  The dataset reveals that microbial species (also called operational taxonomic units, or OTUs) were present in more than 70% of people who participated in the study.
This interactive dashboard needed to contain some specific components.  These components included:
•	A dropdown menu listing all the test subject ID numbers involved in the study would allow the end user to select a specific subject for further evaluation.
•	A Demographic Info Window outlining the demographics of the specific subject.
•	A bar graph showing the top ten OUT’s and their corresponding levels that were identified in the subject’s navel.
•	A bubble chart outlining each discovered OTU and the various components the OUT was comprised of.
 The structure of the solution code consisted for the following functions:
•	function init()
•	function ID_Demographics()
•	function Bar_Chart()
•	function Bubble_Chart()
•	function optionChanged()

function init()
The goal of function_init was to set up the initial web page with data upon first use.  The data was pulled from the json and manipulated using a fat ARROW =>.  The already created empty drop down was identified using its HTML Id tag ‘#selDataset’ with was stored in variable ‘Drop_Down_Menu’.  Both of these tasks were accomplished using D3.
	d3.json(url).then((data) =>
let Drop_Down_Menu = d3.select("#selDataset");

The drop down menu was then populated with the Subject ID Numbers by looping through the data using .forEach.
Subject_ID_Numbers.forEach((ID_Number) => {    
        Drop_Down_Menu.append("option").text(ID_Number).property("value");
        });

Finally, the first Subject ID Number was selected and stored in variable ‘First_ID’ and sent as a parmeter to the functions ID_Demographics, Bar_Chart & Bubble_Chart to set up the initial state of the interactive dashboard. 

let First_ID = Subject_ID_Numbers[0];    

ID_Demographics(First_ID)
Bar_Chart(First_ID)
Bubble_Chart(First_ID)
});

function ID_Demographics(ID_Value)
The goal of function ID_Demographics() was to display dymanic demographic information that correlated with the chosen Subject ID which was passed the function as parameter ‘ID_Value’.  The data was pulled from the json and manipulated using a fat ARROW =>.  This data was stored in variable ‘data’ and the metadata was stored in a variable ‘MetaData’.   
d3.json(url).then((data) =>
let MetaData = data.metadata;

The metadata correlating to the specific ‘ID_Value’  was identified using .filter and the metadata data was stored in variable ‘Selected_Item and the the previous information displayed on the HTML page was cleared out.    
let Selected_MetaData = MetaData.filter((Data) => Data.id == ID_Value);
let Selected_Item = Selected_MetaData[0]
d3.select('#sample-metadata').html('');
Finally, a variable MetaData_Info was used the store the metadata associated with the passed ‘ID_Value’ and the demographics data was populated to the Demographics Pane through the HTML ID '#sample-metadata' using .forEach & .append to loop through and append the demographic data.    
let MetaData_Info = Object.entries(Selected_Item);
MetaData_Info.forEach(([id,info]) => {                     
           d3.select('#sample-metadata').append('h6').text(`${id}: ${info}`);
           });

function Bar_Chart(ID_Value)
The goal of function Bar_chart was to create a dynamic bar graph showing the top ten OUT’s found and display their corresponding levels that were identified from a specific Subject ID.  The data was pulled from the json and manipulated using a fat ARROW =>.  This data was stored in variable ‘data’ and the samples information was stored in a variable ‘Data_Samples’.   
d3.json(url).then((data) =>
let Data_Samples = data.samples;

The ‘Data_Samples’ correlating to the specific ‘ID_Value’  was identified using .filter and stored in variable ‘Selected_ID’ and the key was stored in variable ‘Selected_Item’.  
let Selected_ID = Data_Samples.filter((Data_Samples) => Data_Samples.id === ID_Value);
let Selected_Item = Selected_ID[0];

A trace was assembled with values correlated with ‘Selected_Item’.  The top 10 OUT values were selected using .slice, and the items were assembled in descending order using .reverse.  From the dataset ‘sample_values’ was used for the x-coordinates, ‘otu_ids’ was used for the y-coordinates, text was out_lables, type was ‘bar’ and orientation was ‘h’ to make the graph horizontal.  The trace was then stored in variable Bar_Data and fed into Plotly to create the graph.
let trace = {
            // Slice first 10 otu values and arrange in decenting order
            x: Selected_Item.sample_values.slice(0,10).reverse(),
            y: Selected_Item.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: Selected_Item.otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
let Bar_Data = [trace];
Plotly.newPlot('bar', Bar_Data); 
