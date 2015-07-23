(function(){
  'use strict';
  
  angular.module('organigram', ['organigram.service'])

     // Add http interceptors that allows us to handle http request before it sends and http response parsing
    .config(function($stateProvider){
      $stateProvider
        .state('main.views.organigram', {
          url: '/organigram/:id',
          templateUrl: 'app/organigram/organigram.tpl.html',
          controller: 'Organigram.MainController',
            resolve: {
              organigram: function(Organigram, $stateParams){
                return Organigram.show({id: $stateParams.id}).$promise;
              }
            }
        })
    })
	
	
    .controller('Organigram.MainController', function($scope, $http, organigram, currentUser, HRAPI_CONF, $stateParams){
		
		
	   // función de jairo para iterar
		// for (var j=0; j < a.length; j++){
		// 	for(var i=0; i < b.length; i++){
		// 		if(a[j] == b[i]){
		// 			a[j].push(b[i]);
		// 		}
		// 	}
		// }
				
		$scope.mostrar = function(e) {
			$(e.currentTarget).parent().children("org-info").slideToggle();
			console.log($(e.currentTarget).parent());
		}
		
		$scope.user = currentUser;
		
		$scope.organigram = organigram.organigram;
	
		console.log($scope.organigram);
    var m = [40, 160, 40, 160],
        w = 1280 - m[1] - m[3],
        h = 800 - m[0] - m[2],
        i = 0,
    root;
		url = HRAPI_CONF.apiBaseUrl("/organigram/show/"+url+".json")
		console.log("url",url);
		var tree = d3.layout.tree()
			.size([h, w]);
		// var cluster = d3.layout.cluster()
		//    .size([height, width-400]);
		var diagonal = d3.svg.diagonal()    
		   .projection (function(d) { return [d.y, d.x];}); 
		var svg = d3.select("#chart").append("svg")    
		   .attr("width",w)    
		   .attr("height",h)    
		   .append("g")    
		   .attr("transform","translate(300,0)"); 
		   d3.json(url, function(error, json){    
		   root = json.organigram
		   root.x0 = h / 2;
		   root.y0 = 0;
	   
		  function toggleAll(d) {
	 	    if (d.children) {
	 	      d.children.forEach(toggleAll);
	 	      toggle(d);
	 	    }
	 	  }
	  
		 // Initialize the display to show a few nodes.
		  root.children.forEach(toggleAll);
		  toggle(root.children[0]);
	  
	 	  update(root);
		}); 
	

	function update(source) {
	  var duration = d3.event && d3.event.altKey ? 5000 : 500;

	  // Compute the new tree layout.
	  var nodes = tree.nodes(root).reverse();

	  // console.log(nodes);
	  // Normalize for fixed-depth.
	  nodes.forEach(function(d) { d.y = d.depth * 350; });

	  // Update the nodes…
	  var node = svg.selectAll("g.node")
	      .data(nodes, function(d) { return d.id || (d.id = ++i); });

	  // Enter any new nodes at the parent's previous position.
	  var nodeEnter = node.enter().append("svg:g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	      .on("click", function(d) { toggle(d); update(d); });


	  nodeEnter.append("svg:image")
          .attr("x", function(d) { return d.children || d._children ? -55 : 15; })
          .attr('y',-20)
		  .attr('width', 40)
          .attr('height', 40)
		  .attr("xlink:href",	function(d) { return d.image; })
	
	  
	  nodeEnter.append("svg:circle")
	      .attr("class", "thelink")
	      .attr("r", 1e-6)
	      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

	  nodeEnter.append("svg:text")
	      .attr("x", function(d) { return d.children || d._children ? -60 : 60; })
	      .attr("dy", "-0.5em")
	      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	      .text(function(d) { return d.short_name; })
		  .style("font-size","16px")
	      .style("fill-opacity", 1e-6);
  
	  nodeEnter.append("svg:text")
		  .attr("class", "cargo")
	      .attr("x", function(d) { return d.children || d._children ? -60 : 60; })
	      .attr("dy", ".4em")
	      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	      .text(function(d) { return d.posicion; })
		  .style("font-size","12px")
		  .style("fill", "#6f6f6f")
	      .style("fill-opacity", 1e-6);
		  
	  nodeEnter.append("svg:text")
		  .attr("class", "tel")
	      .attr("x", function(d) { return d.children || d._children ? -60 : 60; })
	      .attr("dy", "1.4em")
	      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	      .text(function(d) { return d.phone; })
		  .style("font-size","12px")
		  .style("fill", "#6f6f6f")
	      .style("fill-opacity", 1e-6);

	  // Transition nodes to their new position.
	  var nodeUpdate = node.transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

	  nodeUpdate.select("circle.thelink")
	      .attr("r", 6.5)
	      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

	  nodeUpdate.selectAll("text")
	      .style("fill-opacity", 1);

	  // Transition exiting nodes to the parent's new position.
	  var nodeExit = node.exit().transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	      .remove();

	  nodeExit.select("circle.thelink")
	      .attr("r", 1e-6);

	  nodeExit.selectAll("text")
	      .style("fill-opacity", 1e-6);

	  // Update the links…
	  var link = svg.selectAll("path.link")
	      .data(tree.links(nodes), function(d) { return d.target.id; });

	  // Enter any new links at the parent's previous position.
	  link.enter().insert("svg:path", "g")
	      .attr("class", "link")
	      .attr("d", function(d) {
	        var o = {x: source.x0, y: source.y0};
	        return diagonal({source: o, target: o});
	      })
	    .transition()
	      .duration(duration)
	      .attr("d", diagonal);

	  // Transition links to their new position.
	  link.transition()
	      .duration(duration)
	      .attr("d", diagonal);

	  // Transition exiting nodes to the parent's new position.
	  link.exit().transition()
	      .duration(duration)
	      .attr("d", function(d) {
	        var o = {x: source.x, y: source.y};
	        return diagonal({source: o, target: o});
	      })
	      .remove();

	  // Stash the old positions for transition.
	  nodes.forEach(function(d) {
	    d.x0 = d.x;
	    d.y0 = d.y;
	  });
	}

	// Toggle children.
	function toggle(d) {
	  if (d.children) {
	    d._children = d.children;
	    d.children = null;
	  } else {
	    d.children = d._children;
	    d._children = null;
	  }
	}
	
		
    });
}());
