<img src="Pics/Header.png" width="893" height="292">


# JavaScript Challenge

[JavaScript Code Link]( https://github.com/MichaelELeonard/JavaScript-Challenge/blob/main/static/js/app.js)

## Background
In this assignment, we were tasked to build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs) were present in more than 70% of the population.


## Data

A D3 library was used to read in data from [samples.json]( https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json)


# Dashboard Visualization Components

### Sample’s metadata is displayed based on dropdown selection
<img src="Pics/Metadata Dropdown.png" width="174" height="532"><img src="Pics/940 Metadata.png" width="212" height="404">


### A horizontal bar chart with a dropdown menu was established to display the top 10 OTUs found in Subject ID’s Bellybutton 
* OTU _ids used as the labels for the bar chart.
* OTU _labels used as the hovertext for the chart.

<img src="Pics/940 Bar Chart popup.png" width="497" height="331">


### A bubble chart displays each sample’s data
* OTU_ids used for the x values.
* OTU sample_values used for the y values.
* OTU sample_values used for the marker size.
* OTU ids used for the marker colors.
* OTU _labels used for the text values.

<img src="Pics/940 Bubble Chart popup.png" width="906" height="285">

# Full Dashboard View
<img src="Pics/Full Dashboard.png" width="888" height="722">

