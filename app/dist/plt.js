(function (d3) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var d3__default = /*#__PURE__*/_interopDefaultLegacy(d3);

    function* zip(arrays) {
      let iterators = arrays.map(a => a[Symbol.iterator]());
      while (true) {
        let results = iterators.map(it => it.next());
        if (results.some(r => r.done)) return;
        yield results.map(r => r.value);
      }
    }
    function xydata(xarr, yarr) {
      const ObjArr = [];
      for (let [xelem, yelem] of zip([xarr, yarr])) {
        ObjArr.push({
          'x': xelem,
          'y': yelem
        });
      }
      return ObjArr;
    }
    const t = [1, 2, 3, 4, 5, 6, 7, 8];
    const x1 = Array.from({
      length: 9
    }, () => Math.floor(Math.random() * 10));
    const x2 = Array.from({
      length: 9
    }, () => Math.floor(Math.random() * 10));
    const x3 = Array.from({
      length: 9
    }, () => Math.floor(Math.random() * 10));
    const x4 = Array.from({
      length: 9
    }, () => Math.floor(Math.random() * 10));
    const data = [xydata(t, x1), xydata(t, x2), xydata(t, x3), xydata(t, x4)];
    var colors = ['steelblue', 'green', 'red', 'purple', 'black'];
    var margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 50
      },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    var x = d3__default["default"].scale.linear().domain([0, 12]).range([0, width]);
    var y = d3__default["default"].scale.linear().domain([0, 30]).range([height, 0]);
    var xAxis = d3__default["default"].svg.axis().scale(x).tickSize(-height).tickPadding(10).tickSubdivide(true).orient('bottom');
    var yAxis = d3__default["default"].svg.axis().scale(y).tickPadding(10).tickSize(-width).tickSubdivide(true).orient('left');
    var zoom = d3__default["default"].behavior.zoom().x(x).y(y).scaleExtent([1, 10]).on('zoom', zoomed);
    var svg = d3__default["default"].select('body').append('svg').call(zoom).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')').call(xAxis);
    svg.append('g').attr('class', 'y axis').call(yAxis);
    svg.append('g').attr('class', 'y axis').append('text').attr('class', 'axis-label').attr('transform', 'rotate(-90)').attr('y', -margin.left + 10).attr('x', -height / 2).text('someplot');
    svg.append('clipPath').attr('id', 'clip').append('rect').attr('width', width).attr('height', height);
    var line = d3__default["default"].svg.line().interpolate('linear').x(function (d) {
      return x(d.x);
    }).y(function (d) {
      return y(d.y);
    });
    svg.selectAll('.line').data(data).enter().append('path').attr('class', 'line').attr('clip-path', 'url(#clip)').attr('stroke', function (d, i) {
      return colors[i % colors.length];
    }).attr('d', line);
    var points = svg.selectAll('.dots').data(data).enter().append('g').attr('class', 'dots').attr('clip-path', 'url(#clip)');
    points.selectAll('.dot').data(function (d, index) {
      var a = [];
      d.forEach(function (point) {
        a.push({
          'index': index,
          'point': point
        });
      });
      return a;
    }).enter().append('circle').attr('class', 'dot').attr('r', 2.5).attr('fill', function (d) {
      return colors[d.index % colors.length];
    }).attr('transform', function (d) {
      return 'translate(' + x(d.point.x) + ',' + y(d.point.y) + ')';
    });
    function zoomed() {
      svg.select('.x.axis').call(xAxis);
      svg.select('.y.axis').call(yAxis);
      svg.selectAll('path.line').attr('d', line);
      points.selectAll('circle').attr('transform', function (d) {
        return 'translate(' + x(d.point.x) + ',' + y(d.point.y) + ')';
      });
    }

})(d3);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx0LmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9wbG90dGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkMyBmcm9tICdkMyc7XG5cbmZ1bmN0aW9uKiB6aXAoYXJyYXlzKSB7XG4gICAgbGV0IGl0ZXJhdG9ycyA9IGFycmF5cy5tYXAoYSA9PiBhW1N5bWJvbC5pdGVyYXRvcl0oKSk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBpdGVyYXRvcnMubWFwKGl0ID0+IGl0Lm5leHQoKSk7XG4gICAgICAgIGlmIChyZXN1bHRzLnNvbWUociA9PiByLmRvbmUpKSByZXR1cm47XG4gICAgICAgIHlpZWxkIHJlc3VsdHMubWFwKHIgPT4gci52YWx1ZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB4eWRhdGEoeGFyciwgeWFycilcbntcbiAgICBjb25zdCBPYmpBcnIgPSBbXTtcbiAgICBmb3IgKGxldCBbeGVsZW0sIHllbGVtXSBvZiB6aXAoW3hhcnIsIHlhcnJdKSkge1xuICAgICAgICBPYmpBcnIucHVzaCh7J3gnOnhlbGVtLCd5Jzp5ZWxlbX0pO1xuICAgIH1cbiAgICByZXR1cm4gT2JqQXJyO1xufVxuXG5jb25zdCB0ID0gWzEsMiwzLDQsNSw2LDcsOF07XG5cbmNvbnN0IHgxID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiA5fSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKTtcbmNvbnN0IHgyID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiA5fSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKTtcbmNvbnN0IHgzID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiA5fSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKTtcbmNvbnN0IHg0ID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiA5fSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKTtcblxuY29uc3QgZGF0YSA9IFt4eWRhdGEodCx4MSksIHh5ZGF0YSh0LHgyKSwgeHlkYXRhKHQseDMpLCB4eWRhdGEodCx4NCldO1xuXG52YXIgY29sb3JzID0gW1xuICAgICdzdGVlbGJsdWUnLFxuICAgICdncmVlbicsXG4gICAgJ3JlZCcsXG4gICAgJ3B1cnBsZScsXG4gICAgJ2JsYWNrJ1xuXTtcblxudmFyIG1hcmdpbiA9IHt0b3A6IDIwLCByaWdodDogMzAsIGJvdHRvbTogMzAsIGxlZnQ6IDUwfSxcbiAgICB3aWR0aCA9IDk2MCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgIGhlaWdodCA9IDUwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXHRcbnZhciB4ID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAuZG9tYWluKFswLCAxMl0pXG4gICAgLnJhbmdlKFswLCB3aWR0aF0pO1xuIFxudmFyIHkgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgIC5kb21haW4oWyAwLCAzMF0pXG4gICAgLnJhbmdlKFtoZWlnaHQsIDBdKTtcblx0XG52YXIgeEF4aXMgPSBkMy5zdmcuYXhpcygpXG4gICAgLnNjYWxlKHgpXG4gICAgLnRpY2tTaXplKC1oZWlnaHQpXG4gICAgLnRpY2tQYWRkaW5nKDEwKVx0XG4gICAgLnRpY2tTdWJkaXZpZGUodHJ1ZSlcdFxuICAgIC5vcmllbnQoJ2JvdHRvbScpO1x0XG5cdFxudmFyIHlBeGlzID0gZDMuc3ZnLmF4aXMoKVxuICAgIC5zY2FsZSh5KVxuICAgIC50aWNrUGFkZGluZygxMClcbiAgICAudGlja1NpemUoLXdpZHRoKVxuICAgIC50aWNrU3ViZGl2aWRlKHRydWUpXHRcbiAgICAub3JpZW50KCdsZWZ0Jyk7XG5cdFxudmFyIHpvb20gPSBkMy5iZWhhdmlvci56b29tKClcbiAgICAueCh4KVxuICAgIC55KHkpXG4gICAgLnNjYWxlRXh0ZW50KFsxLCAxMF0pXG4gICAgLm9uKCd6b29tJywgem9vbWVkKTtcdFxuXG52YXIgc3ZnID0gZDMuc2VsZWN0KCdib2R5JykuYXBwZW5kKCdzdmcnKVxuICAgIC5jYWxsKHpvb20pXG4gICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywnICsgbWFyZ2luLnRvcCArICcpJyk7XG4gXG5zdmcuYXBwZW5kKCdnJylcbiAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcbiAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyBoZWlnaHQgKyAnKScpXG4gICAgLmNhbGwoeEF4aXMpO1xuIFxuc3ZnLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgLmNhbGwoeUF4aXMpO1xuIFxuc3ZnLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgLmFwcGVuZCgndGV4dCcpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMtbGFiZWwnKVxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxuICAgIC5hdHRyKCd5JywgKC1tYXJnaW4ubGVmdCkgKyAxMClcbiAgICAuYXR0cigneCcsIC1oZWlnaHQvMilcbiAgICAudGV4dCgnc29tZXBsb3QnKTtcdFxuIFxuc3ZnLmFwcGVuZCgnY2xpcFBhdGgnKVxuICAgIC5hdHRyKCdpZCcsICdjbGlwJylcbiAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAuYXR0cignd2lkdGgnLCB3aWR0aClcbiAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0KTtcblxudmFyIGxpbmUgPSBkMy5zdmcubGluZSgpXG4gICAgLmludGVycG9sYXRlKCdsaW5lYXInKVx0XG4gICAgLngoZnVuY3Rpb24oZCkgeyByZXR1cm4geChkLngpOyB9KVxuICAgIC55KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHkoZC55KTsgfSk7XHRcdFxuXHRcbnN2Zy5zZWxlY3RBbGwoJy5saW5lJylcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZCgncGF0aCcpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuICAgIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCNjbGlwKScpXG4gICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQsaSl7IFx0XHRcdFxuICAgICAgICByZXR1cm4gY29sb3JzW2klY29sb3JzLmxlbmd0aF07XG4gICAgfSlcbiAgICAuYXR0cignZCcsIGxpbmUpO1x0XHRcblxudmFyIHBvaW50cyA9IHN2Zy5zZWxlY3RBbGwoJy5kb3RzJylcbiAgICAuZGF0YShkYXRhKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2RvdHMnKVxuICAgIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCNjbGlwKScpO1x0XG4gXG5wb2ludHMuc2VsZWN0QWxsKCcuZG90JylcbiAgICAuZGF0YShmdW5jdGlvbihkLCBpbmRleCl7IFx0XHRcbiAgICAgICAgdmFyIGEgPSBbXTtcbiAgICAgICAgZC5mb3JFYWNoKGZ1bmN0aW9uKHBvaW50KXtcbiAgICAgICAgICAgIGEucHVzaCh7J2luZGV4JzogaW5kZXgsICdwb2ludCc6IHBvaW50fSk7XG4gICAgICAgIH0pO1x0XHRcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoJ2NpcmNsZScpXG4gICAgLmF0dHIoJ2NsYXNzJywnZG90JylcbiAgICAuYXR0cigncicsIDIuNSlcbiAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpeyBcdFxuICAgICAgICByZXR1cm4gY29sb3JzW2QuaW5kZXglY29sb3JzLmxlbmd0aF07XG4gICAgfSlcdFxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7IFxuICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgeChkLnBvaW50LngpICsgJywnICsgeShkLnBvaW50LnkpICsgJyknOyB9XG4gICAgKTtcblxuZnVuY3Rpb24gem9vbWVkKCkge1xuICAgIHN2Zy5zZWxlY3QoJy54LmF4aXMnKS5jYWxsKHhBeGlzKTtcbiAgICBzdmcuc2VsZWN0KCcueS5heGlzJykuY2FsbCh5QXhpcyk7ICAgXG4gICAgc3ZnLnNlbGVjdEFsbCgncGF0aC5saW5lJykuYXR0cignZCcsIGxpbmUpOyAgXG4gXG4gICAgcG9pbnRzLnNlbGVjdEFsbCgnY2lyY2xlJykuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkgeyBcbiAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHgoZC5wb2ludC54KSArICcsJyArIHkoZC5wb2ludC55KSArICcpJzsgfVxuICAgICk7ICBcbn0iXSwibmFtZXMiOlsiemlwIiwiYXJyYXlzIiwiaXRlcmF0b3JzIiwibWFwIiwiYSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwicmVzdWx0cyIsIml0IiwibmV4dCIsInNvbWUiLCJyIiwiZG9uZSIsInZhbHVlIiwieHlkYXRhIiwieGFyciIsInlhcnIiLCJPYmpBcnIiLCJ4ZWxlbSIsInllbGVtIiwicHVzaCIsInQiLCJ4MSIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIngyIiwieDMiLCJ4NCIsImRhdGEiLCJjb2xvcnMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJ3aWR0aCIsImhlaWdodCIsIngiLCJkMyIsInNjYWxlIiwibGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJ5IiwieEF4aXMiLCJzdmciLCJheGlzIiwidGlja1NpemUiLCJ0aWNrUGFkZGluZyIsInRpY2tTdWJkaXZpZGUiLCJvcmllbnQiLCJ5QXhpcyIsInpvb20iLCJiZWhhdmlvciIsInNjYWxlRXh0ZW50Iiwib24iLCJ6b29tZWQiLCJzZWxlY3QiLCJhcHBlbmQiLCJjYWxsIiwiYXR0ciIsInRleHQiLCJsaW5lIiwiaW50ZXJwb2xhdGUiLCJkIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJpIiwicG9pbnRzIiwiaW5kZXgiLCJmb3JFYWNoIiwicG9pbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFFQSxVQUFVQSxHQUFHQSxDQUFDQyxNQUFNLEVBQUU7SUFDbEIsRUFBQSxJQUFJQyxTQUFTLEdBQUdELE1BQU0sQ0FBQ0UsR0FBRyxDQUFDQyxDQUFDLElBQUlBLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDckQsRUFBQSxPQUFPLElBQUksRUFBRTtJQUNULElBQUEsSUFBSUMsT0FBTyxHQUFHTCxTQUFTLENBQUNDLEdBQUcsQ0FBQ0ssRUFBRSxJQUFJQSxFQUFFLENBQUNDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDNUMsSUFBSUYsT0FBTyxDQUFDRyxJQUFJLENBQUNDLENBQUMsSUFBSUEsQ0FBQyxDQUFDQyxJQUFJLENBQUMsRUFBRSxPQUFBO1FBQy9CLE1BQU1MLE9BQU8sQ0FBQ0osR0FBRyxDQUFDUSxDQUFDLElBQUlBLENBQUMsQ0FBQ0UsS0FBSyxDQUFDLENBQUE7SUFDbkMsR0FBQTtJQUNKLENBQUE7SUFFQSxTQUFTQyxNQUFNQSxDQUFDQyxJQUFJLEVBQUVDLElBQUksRUFDMUI7TUFDSSxNQUFNQyxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLEVBQUEsS0FBSyxJQUFJLENBQUNDLEtBQUssRUFBRUMsS0FBSyxDQUFDLElBQUluQixHQUFHLENBQUMsQ0FBQ2UsSUFBSSxFQUFFQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQzFDQyxNQUFNLENBQUNHLElBQUksQ0FBQztJQUFDLE1BQUEsR0FBRyxFQUFDRixLQUFLO0lBQUMsTUFBQSxHQUFHLEVBQUNDLEtBQUFBO0lBQUssS0FBQyxDQUFDLENBQUE7SUFDdEMsR0FBQTtJQUNBLEVBQUEsT0FBT0YsTUFBTSxDQUFBO0lBQ2pCLENBQUE7SUFFQSxNQUFNSSxDQUFDLEdB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
