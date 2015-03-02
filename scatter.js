scatter = function(data){
  //This creates an array of years for the x-axis values
  var years = [];
  var i = 1856;
  while (i < 1980){
    years.push(i);
    i += 4;
  }
 
  //this creates your canvas, make the width 575
  var canvas = d3.select('#chart')
                 .append('svg')
                 .attr('height', 575)
                 .attr('width', 575);
  // now let's set up scales for our axes
  // you'll notice that they are smaller than the canvas (500 vs 575)
  // this means they can fit comfortably inside our canvas
 
 
  // the x-axis scale is set up for you ...
  // takes values in [1856,1976] and maps them to values in [0,500]
  var xScale = d3.time.scale()
                  .domain([new Date(1856,1,1),new Date(1976,1,1)])
                  .range([0,500]);
 
 
  // ... now you set up the y-axis scale
  var yMin = 0; //what should this value be?
  var yMax = 100; //what should this value be?
  // you have domain, but you will need a range as well (0 to 500 as above)
  var yScale = d3.scale.linear()
                  .domain([yMax,yMin])
                  .range([0,500]);
                   //To Think About: why max to min on y-axis?
 
 
  //use the scales to set up the axes
  //y-axis is set up for you
  var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient('left');
 
  // you try this one, you won't need to orient it.
  var xAxis = d3.svg.axis()
              .scale(xScale);
 
 
  //we'll use a wrapper to group together all of the things we render on the canvas
  var wrapper = canvas.append('g');
  //we move the wrapper in from the sides of the canvas so we can see our visualization
  wrapper.attr('transform','translate(50,50)');
 
 
  //here, we append the x-axis to the the wrapper, note the translation
  wrapper.append('g')
        .attr('transform','translate(0,500)')
        .call(xAxis);
 
  //now you append the y-axis, no need for any translation
 wrapper.append('g')
        .call(yAxis);
 
 
  //now render our data on the plot
  var redPoints = wrapper.selectAll('circle')
         .data(data)
         .enter()
         .append('circle')
         .attr('r',5)
         .attr('cx',function(d,i){
          return xScale(new Date(years[i],1,1));
         })
         .attr('cy',function(d,i){
            //return the appropriate y value in here
            return yScale(d);
         })
         .attr('fill','red');
  // PAUSE: Your code should now be runnable!
  // load show.html and type in a state to see the plot (capitalize correctly)
 
  //for each red point, render the complimentary blue point
  //i.e. if the republican vote is 55.5, then the democratic vote is 100-55.5 = 44.5
  //make each of these points a rectangle
 var bluePoints = wrapper.selectAll('rect')
         .data(data)
         .enter()
         .append('rect')
         .attr('x', function(d,i){
            return (xScale(new Date(years[i],1,1))-5);
         })
         .attr('y', function(d,i){
            return(yScale(100-d)-5);
         })
         .attr('height', function(d,i){
            return 10;
         })
         .attr('width', function(d,i){
            return 10;
         })
         .attr('fill','blue');
 
 
  // BONUS CHALLENGE: If you finish early, try adding appropriately colored lines to connect the points on the plot.
    data.forEach(function(val,i){
      if(i<data.length-1){
        wrapper.append('line')
          .attr('x1', xScale(new Date(years[i],1,1)))
          .attr('x2', xScale(new Date(years[i+1],1,1)))
          .attr('y1',yScale(100-data[i]))
          .attr('y2',yScale(100-data[i+1]))
          .attr('stroke', 'blue')
      

        wrapper.append('line')
          .attr('x1', xScale(new Date(years[i],1,1)))
          .attr('x2', xScale(new Date(years[i+1],1,1)))
          .attr('y1',yScale(data[i]))
          .attr('y2',yScale(data[i+1]))
          .attr('stroke', 'red')
      }
    });
  return canvas;
}
