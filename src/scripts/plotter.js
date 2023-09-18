import d3 from 'd3';

function* zip(arrays) {
    let iterators = arrays.map(a => a[Symbol.iterator]());
    while (true) {
        let results = iterators.map(it => it.next());
        if (results.some(r => r.done)) return;
        yield results.map(r => r.value);
    }
}

function xydata(xarr, yarr)
{
    const ObjArr = [];
    for (let [xelem, yelem] of zip([xarr, yarr])) {
        ObjArr.push({'x':xelem,'y':yelem});
    }
    return ObjArr;
}

const t = [1,2,3,4,5,6,7,8];

const x1 = Array.from({length: 9}, () => Math.floor(Math.random() * 10));
const x2 = Array.from({length: 9}, () => Math.floor(Math.random() * 10));
const x3 = Array.from({length: 9}, () => Math.floor(Math.random() * 10));
const x4 = Array.from({length: 9}, () => Math.floor(Math.random() * 10));

const data = [xydata(t,x1), xydata(t,x2), xydata(t,x3), xydata(t,x4)];

var colors = [
    'steelblue',
    'green',
    'red',
    'purple',
    'black'
];

var margin = {top: 20, right: 30, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
	
var x = d3.scale.linear()
    .domain([0, 12])
    .range([0, width]);
 
var y = d3.scale.linear()
    .domain([ 0, 30])
    .range([height, 0]);
	
var xAxis = d3.svg.axis()
    .scale(x)
    .tickSize(-height)
    .tickPadding(10)	
    .tickSubdivide(true)	
    .orient('bottom');	
	
var yAxis = d3.svg.axis()
    .scale(y)
    .tickPadding(10)
    .tickSize(-width)
    .tickSubdivide(true)	
    .orient('left');
	
var zoom = d3.behavior.zoom()
    .x(x)
    .y(y)
    .scaleExtent([1, 10])
    .on('zoom', zoomed);	

var svg = d3.select('body').append('svg')
    .call(zoom)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
 
svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);
 
svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);
 
svg.append('g')
    .attr('class', 'y axis')
    .append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('y', (-margin.left) + 10)
    .attr('x', -height/2)
    .text('someplot');	
 
svg.append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', width)
    .attr('height', height);

var line = d3.svg.line()
    .interpolate('linear')	
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });		
	
svg.selectAll('.line')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('clip-path', 'url(#clip)')
    .attr('stroke', function(d,i){ 			
        return colors[i%colors.length];
    })
    .attr('d', line);		

var points = svg.selectAll('.dots')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'dots')
    .attr('clip-path', 'url(#clip)');	
 
points.selectAll('.dot')
    .data(function(d, index){ 		
        var a = [];
        d.forEach(function(point){
            a.push({'index': index, 'point': point});
        });		
        return a;
    })
    .enter()
    .append('circle')
    .attr('class','dot')
    .attr('r', 2.5)
    .attr('fill', function(d){ 	
        return colors[d.index%colors.length];
    })	
    .attr('transform', function(d) { 
        return 'translate(' + x(d.point.x) + ',' + y(d.point.y) + ')'; }
    );

function zoomed() {
    svg.select('.x.axis').call(xAxis);
    svg.select('.y.axis').call(yAxis);   
    svg.selectAll('path.line').attr('d', line);  
 
    points.selectAll('circle').attr('transform', function(d) { 
        return 'translate(' + x(d.point.x) + ',' + y(d.point.y) + ')'; }
    );  
}