MODULE 14 BELLY-BUTTON-CHALLENGE

The Assignment

In the Module 14 Belly-Button-Challenge we were tasked with building an interactive dashboard to explore Belly Button Biodiversity.   Cataloged data of human navels microbes was downloaded from https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json and utilized to build the interactive dashboard so an end user can dynamically examine the data.  The dataset reveals that microbial species (also called operational taxonomic units, or OTUs) were present in more than 70% of people who participated in the study.

This interactive dashboard needed to contain some specific components on the HTML page.  These components included:
•	A dropdown menu listing all the test subject ID numbers involved in the study which would allow the end user to select a specific subject ID for further evaluation.
•	A Demographic Info Window outlining the demographics of the specific test subject.
•	A bar graph showing the top ten OTU’s identified in the subject’s navel. and their corresponding levels.
•	A bubble chart showing each discovered OTU and its various components

The structure of the solution code consisted for the following functions:
•	function init()
•	function ID_Demographics()
•	function Bar_Chart()
•	function Bubble_Chart()
•	function optionChanged()

function init()

The goal of function_init was to set up the initial web page with data prior to first ID choice.  The data was pulled from the json and manipulated using a fat ARROW =>.  The already created empty drop down list was identified using its HTML ID tag ‘#selDataset’ which was stored in variable ‘Drop_Down_Menu’.  Both tasks were accomplished using D3.

	d3.json(url).then((data) =>
        let Drop_Down_Menu = d3.select(‘#selDataset’);

The drop down menu was populated with the Subject ID Numbers by looping through the data using .forEach.

        Subject_ID_Numbers.forEach((ID_Number) => {    
        Drop_Down_Menu.append("option").text(ID_Number).property("value");
        });

Finally, the first Subject ID Number was selected and stored in variable ‘First_ID’ and sent as a parameter to the functions ID_Demographics, Bar_Chart & Bubble_Chart to set up the initial state of the interactive dashboard. 

        let First_ID = Subject_ID_Numbers[0];    

        ID_Demographics(First_ID)
        Bar_Chart(First_ID)
        Bubble_Chart(First_ID)

function ID_Demographics(ID_Value)

The goal of function ID_Demographics() was to dynamically display demographic information that correlates to a chosen Subject ID, which was passed to the function as parameter ‘ID_Value’.  The data was pulled from the json and manipulated using a fat ARROW =>.  This data was stored in variable ‘data’ and the metadata was stored in a variable ‘MetaData’.  

        d3.json(url).then((data) =>
        let MetaData = data.metadata;

The metadata correlating to the specific ‘ID_Value’ was identified using .filter and the metadata data was stored in variable ‘Selected_Item’ and the previous information displayed in the demographics window was cleared out.    

        let Selected_MetaData = MetaData.filter((Data) => Data.id == ID_Value);
        let Selected_Item = Selected_MetaData[0]
        d3.select('#sample-metadata').html('');

Finally, a variable MetaData_Info  stored the metadata associated with the passed ‘ID_Value’ and the demographics data populated to the Demographics Pane using .forEach & .append to loop through and append the information using D3 and the HTML ID '#sample-metadata'.

        let MetaData_Info = Object.entries(Selected_Item);
        MetaData_Info.forEach(([id,info]) => {                     
                d3.select('#sample-metadata').append('h6').text(`${id}: ${info}`);
        });

function Bar_Chart(ID_Value)

The goal of function Bar_chart was to create a dynamic bar graph showing the top ten OTU’s found from a selected test subject, and display their corresponding levels.  The data was pulled from the json and manipulated using a fat ARROW =>.  This data was stored in variable ‘data’ and the samples information was stored in a variable ‘Data_Samples’.   

        d3.json(url).then((data) =>
        let Data_Samples = data.samples;

The ‘Data_Samples’ correlating to the specific ‘ID_Value’ was identified using .filter and stored in variable ‘Selected_ID’, with the key was stored in ‘Selected_Item’. 

        let Selected_ID = Data_Samples.filter((Data_Samples) => Data_Samples.id === ID_Value);
        let Selected_Item = Selected_ID[0];

A trace was assembled with values correlated with ‘Selected_Item’.  The top 10 OTU values were selected using .slice, and the items were assembled in descending order using .reverse.  Data was pulled from the dataset ‘Selected_Item’ for the trace.  The ‘sample_values were used for the x-coordinates, ‘otu_ids’ were used for the y-coordinates and ‘otu_lables’ were used for the text. The graph type was set to ‘bar’ and the orientation was set to ‘h’ to make the graph horizontal.  The trace was then stored in variable Bar_Data and passed to Plotly to create the graph.

        let trace = 
            x: Selected_Item.sample_values.slice(0,10).reverse(),
            y: Selected_Item.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: Selected_Item.otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        let Bar_Data = [trace];
        Plotly.newPlot('bar', Bar_Data); 

function Bubble_Chart(ID_Value)

The goal of function Bubble_Chart was to create a dynamic bubble chart showing the OTU’s found for a selected test subject and displaying the bubbles correlating to the OTU values.  The data was pulled from the json and manipulated using a fat ARROW =>.  This data was stored in variable ‘data’ and the samples information was stored in a variable ‘Data_Samples’. The ‘Data_Samples’ were filtered by ‘ID_Value’ using .filter and stored in variable ‘Selected_ID’ with the key was stored in variable ‘Selected_Item’.  

        d3.json(url).then((data) =>
        let Data_Samples = data.samples;
        let Selected_ID = Data_Samples.filter((Data_Samples) => Data_Samples.id === ID_Value);
        let Selected_Item = Selected_ID[0];

A trace was assembled with data from ‘Selected_Item’.  The variable ‘otu_ids’ was used for the x-coordinate, ‘sample_values’ was used for the y-coordinates, ‘out_lables’ used for the text, and mode was set to ‘markers’.  A marker dictionary was set up with ‘sample_values’ used for the bubble size, ‘otu_ids’ used for the bubble color.

        let trace = {
            x: Selected_Item.otu_ids,
            y: Selected_Item.sample_values,
            text: Selected_Item.otu_labels,
            mode: 'markers',        
            marker: {
                size: Selected_Item.sample_values,
                color: Selected_Item.otu_ids,
            },
        };

The trace was stored in variable Bubble_Data, the layout was set to have the xaxis title as ‘OUT ID’. Finally the collection of information was passed to Plotly to create the bubble chart.

        let Bubble_Data = [trace];
        let layout = {
                xaxis: {title: 'OTU ID'}        
        };
        Plotly.newPlot('bubble', Bubble_Data, layout);

function optionChanged(New_ID)

The optionchanged(New_ID) function recognizes when the end user has selected a new Subject ID number from the drop down menu and set the selected ID number to variable ‘New_ID’ which was passed as a parameter to the other functions to dynamically update the HTML page with the desired output.      

        ID_Demographics(New_ID);
        Bar_Chart(New_ID);
        Bubble_Chart(New_ID)
