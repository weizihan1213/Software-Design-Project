var received = ({
	"tables": [
	  "automotive"
	],
	"variables": [
	  {
		"name": "BodyStyle",
		"table": "automotive",
		"type": "Categorical",
		"levels": [
		  "convertible",
		  "hardtop",
		  "hatchback",
		  "sedan",
		  "wagon"
		],
		"categorical_distribution": [
		  {
			"level": "convertible",
			"percentage": "0.0292682926829268"
		  },
		  {
			"level": "hardtop",
			"percentage": "0.0390243902439024"
		  },
		  {
			"level": "hatchback",
			"percentage": "0.341463414634146"
		  },
		  {
			"level": "sedan",
			"percentage": "0.468292682926829"
		  },
		  {
			"level": "wagon",
			"percentage": "0.121951219512195"
		  }
		]
	  },
	  {
		"name": "Length",
		"table": "automotive",
		"type": "Numerical",
		"levels": [
		  "141.1",
		  "208.1"
		],
		"numerical_distribution": {
		  "minimum": "141.1",
		  "first_quantile": "166.3",
		  "median": "173.2",
		  "third_quantile": "183.1",
		  "maximum": "208.1"
		}
	  }
	],
	"relationships": [
	  {
		"conditions": [
		  {
			"variable": "BodyStyle",
			"value": [
			  "hatchback"
			],
			"table": "automotive"
		  }
		],
		"related_variables": [
		  {
			"name": "Price",
			"table": "automotive"
		  },
		  {
			"name": "DriveWheels",
			"table": "automotive"
		  }
		]
	  },
	  {
		"conditions": [
		  {
			"variable": "Cylinders",
			"value": [
			  "five"
			],
			"table": "automotive"
		  }
		],
		"related_variables": [
		  {
			"name": "Price",
			"table": "automotive"
		  },
		  {
			"name": "FuelSystem",
			"table": "automotive"
		  }
		]
	  }
	]
  });
var variables_dataset = [];
var relationships_dataset = [];
for (let i = 0; i < received.variables.length; i++)
	variables_dataset.push(received.variables[i]);
for (let i = 0; i < received.relationships.length; i++)
	relationships_dataset.push(received.relationships[i]);
var num_dist = [];
/*
var variables_name = [];
var cate_dist = [];



for (let j = 0; j < variables_dataset.length; j++)
	variables_name[j] = {"id": j, "name": variables_dataset[j].name};

for (let k = 0; k < variables_dataset[1].categorical_distribution.length; k ++)
	cate_dist[k] = variables_dataset[1].categorical_distribution[k]
	
for(let m = 0; m < cate_dist.length; m++)
	cate_dist[m] = {"level": cate_dist[m].percentage}*/


 
var table = webix.ui({
	"rows": [
		{
			"cols": [
				{ "label": "Variables", "view": "label"}
			]
		},
		{
			"cols": [
				{
					"rows": [
                        { "view": "list", id: "variables_list", minWidth: 200, select: true, data:variables_dataset, template: "#name#", "borderless": 1, on: {onAfterSelect: drawGraph}, "height": 255 }
					]
				},
				{ "autoheight" : true, id: "relationship_btn", "view" : "button", "label": "Relationships", on: {onAfterSelect: getRelationship},"width" : 200, "height" : 20}
			]}
		]
	});






	


function drawGraph(id) {
	var values = $$("variables_list").getItem(id).type;	
	var boxplot_name = $$("variables_list").getItem(id).name;
	if (values == "Categorical")
	{
		var category = $$("variables_list").getItem(id).categorical_distribution;		
		var new_cate_pie = [];
		var new_cate_tab = []
		var names = [];	
		for(let m = 0; m < category.length; m++)
		{
			new_cate_pie[m] = category[m].percentage;
			new_cate_tab[m] = category[m].percentage;
			names[m] = category[m].level;
		}		
		var data1 = [{
				values: new_cate_pie,
				labels: names,				
				type: 'pie'
			  }];
		for(i=0; i<new_cate_tab.length; i++){
			new_cate_tab[i] = (parseFloat(new_cate_tab[i]) * 100).toFixed(2) + '%'
		}
	    var data2 = [{
			type: 'table',
				header: {
				values: [["<b>level</b>"], ["<b>percentage</b>"]],
				align: ["left", "center"],
				line: {width: 1, color: '#506784'},
				fill: {color: '#119DFF'},
				font: {family: "Arial", size: 12, color: "white"} 
			},
			cells: {
				values: [names, new_cate_tab],
				align: ["left", "center"],
				line: {color: "#506784", width: 1},
			    fill: {color: ['#25FEFD', 'white']},
				font: {family: "Arial", size: 11, color: ["#506784"]}
			}
		}];			  
		var layout = {
			height: 400,
			width: 500
		};			  
		Plotly.newPlot('layout1', data1, layout);
		Plotly.newPlot('layout2', data2, layout);		
	}
	else {
		 var numerical = $$("variables_list").getItem(id).numerical_distribution;
		 num_dist[0] = numerical.minimum;
		 num_dist[1] = numerical.first_quantile;
		 num_dist[2] = numerical.median;
		 num_dist[3] = numerical.third_quantile;
		 num_dist[4] = numerical.maximum;		 
		 var trace2 = {
			x: num_dist,
			type: 'box',
			name: boxplot_name
		 };		  
		 var data1 = [trace2];
		 var data2 = [{
			type: 'table',
				header: {
				values: [["<b></b>"], ["<b>Value</b>"]],
				align: ["left", "center"],
				line: {width: 1, color: '#506784'},
				fill: {color: '#119DFF'},
				font: {family: "Arial", size: 12, color: "white"} 
			},
			cells: {
				values: [["Minimum", "First Quantile", "Median", "Third Quantile", "Maximum"], num_dist],
				align: ["left", "center"],
				line: {color: "#506784", width: 1},
			    fill: {color: ['#25FEFD', 'white']},
				font: {family: "Arial", size: 11, color: ["#506784"]}
			}
		}];
		var layout = {
			height: 400,
			width: 500
		};				  
		 Plotly.newPlot('layout1', data1, layout);
		 Plotly.newPlot('layout2', data2, layout);
	}	
}	

function getRelationship() {
	chosen = $$("variables_list").getItem(id).name;
	var correlated = document.getElementById("layout1");
	document.getElementById("exp").innerHTML = "THis" + chosen;
	var conditions = doucment.getElementById("layout2");
}





