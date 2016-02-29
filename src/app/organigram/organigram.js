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
              organigram: function(Organigram){
                return Organigram.index().$promise;
              }
            }
        })
    })
	
  .controller('Organigram.MainController', ['$scope', '$http', 'organigram', 'HRAPI_CONF', '$stateParams', function($scope, $http, organigram, HRAPI_CONF, $stateParams){
  	$scope.employeeData      = null;
		$scope.modalDataEmployee = 'app/includes/modal_data_employee.tpl.html';

		$scope.showModal = function(employee){
      $('#employeeDataOrganigramModal').foundation('reveal', 'open');
      $scope.employeeData = employee;
    }
    
		$scope.changedOverIcon = function(e, key){
			$('#icon_'+key).css('visibility', 'visible');
		}

		$scope.changedDownIcon = function(e, key){
			$('#icon_'+key).css('visibility', 'hidden');
		}

		$scope.mostrar = function(e, key) {
			$(e.currentTarget).parent().children("ul.childs").slideToggle(function(){
				if($(this).is(':visible')){
					$('#icon_'+key).children('span').removeClass('fa fa-plus fa-lg').addClass('fa fa-minus fa-lg');
				}else{
					$('#icon_'+key).children('span').removeClass('fa fa-minus fa-lg').addClass('fa fa-plus fa-lg');
				}
			});
		}

		$scope.image_organigram = function(image){
			if (image == undefined){
				return "images/generic_user_image.jpg";
			}else{
				return image;
			}
			
		}
		
	$scope.organigram = organigram.organigram;
	
    var m = [10, 200, 10, 20],
        w = screen.width - m[1] - m[3],
        i = 0,
        h = 0,
        root;
    var tree = d3.layout.tree();
    var svg = d3.select("#chart").append("svg");
        svg.attr("transform","translate(0,300)");
        svg.append("g")    
		var diagonal = d3.svg.diagonal()
		   .projection (function(d) { return [d.y, d.x];});  
		   root = $scope.organigram;
		   root.x0 = h / 2;
		   root.y0 = 0;
       // console.log(root, root.children.length, w);
        h = root.children.length*45 - m[0] - m[2];
        if (h < 1000){
          h = 1000;
        }else{
          h = h + 200;
        }
 		tree.size([h, w]);
      
  	   svg.attr("width",w)
  	   svg.attr("height",h)
	   
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
	

		function update(source) {
    
		  var duration = d3.event && d3.event.altKey ? 3000 : 300;

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

			// nodeEnter.append("rect")
			// 	      .attr("x", function(d) { return d.children || d._children ? -58 : 58; })
			// 	      .attr("y", -25)
			// 		.attr("width", 260)
			//     .attr("height", 45)
			//     .attr("fill", "white");

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
					.style("stroke", "#EBF6FF")
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
  }]);
}());
