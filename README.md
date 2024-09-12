<img src="Pics/Header.png" width="893" height="292">


# JavaScript Challenge

JavaScript Code - https://github.com/MichaelELeonard/JavaScript-Challenge/blob/main/static/js/app.js


## Background
In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.


## Data
Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json

## Visualizations
### Horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
•	Use sample_values as the values for the bar chart.
•	Use otu_ids as the labels for the bar chart.
•	Use otu_labels as the hovertext for the chart.

<img src="Pics/940 Bar Chart.png" width="454" height="321">


###  Bubble chart that displays each sample.
•	Use otu_ids for the x values.
•	Use sample_values for the y values.
•	Use sample_values for the marker size.
•	Use otu_ids for the marker colors.
•	Use otu_labels for the text values.

<img src="Pics/940 Bubble Chart.png" width="1195" height="348">



### Metadata, i.e., an individual's demographic information.
•	Loop through each key-value pair from the metadata JSON object and create a text string.
•	Append an html tag with that text to the #sample-metadata panel.

<img src="Pics/940 Metadata.png" width="212" height="404">

## Full Dashboard

<img src="Pics/Full Dashboard.png" width="987" height="803">

