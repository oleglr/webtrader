define(["exports","jquery","moment","../websockets/binary_websockets","../common/rivetsExtra","../charts/chartingRequestMap","text!../trade/tradeConf.html","./lookback","css!../trade/tradeConf.css","../common/util"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}function j(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var k=i(b),l=i(c),m=i(d),n=i(e),o=i(f),p=i(g),q=i(h),r=void 0;n["default"].binders["tick-chart"]={priority:65,bind:function(a){var b=this.model;a.chart=new Highcharts.Chart({title:"",credits:{enabled:!1},chart:{type:"line",renderTo:a,backgroundColor:null,width:1*(a.getAttribute("width")||400),height:1*(a.getAttribute("height")||120),marginLeft:20},tooltip:{formatter:function(){var a=b.array[this.x-1];return a&&a.tooltip||!1}},xAxis:{type:"linear",min:1,max:1*a.getAttribute("tick-count")+1,labels:{enabled:!1}},yAxis:{labels:{align:"left",x:0,formatter:function(){return addComma(this.value.toFixed(r))}},title:"",gridLineWidth:0},series:[{data:[]},{type:"scatter",marker:{enabled:!1},data:[]}],plotOptions:{scatter:{enableMouseTracking:!1}},exporting:{enabled:!1,enableImages:!1},legend:{enabled:!1}})},routine:function(a,b){function c(b,c){var d=c.findIndex(function(a){return a.epoch===+b.exit_tick_time}),e=b.make_exit_spot(d+1);g(a.chart,e)}function d(c){var d=b[c-1];a.chart.series[0].addPoint([c,d.quote])}function e(b){var c=!0,d=i.make_entry_spot(b);g(a.chart,d,c)}function f(b){a.chart.yAxis[0].removePlotLine(b.id),h(a.chart,b)}function g(a,b,c){var d=c?-15:5;a.xAxis[0].addPlotLine({value:b.value,id:b.id||b.value,label:{text:b.label||"label",x:d},color:b.color||"#e98024",width:b.width||2,dashStyle:b.dashStyle||!1})}function h(a,b){a.yAxis[0].addPlotLine({id:b.id||b.label,value:b.value,label:{text:b.label,align:"center"},color:"green",width:2}),a.series[1].addPoint([1,1*b.value])}var i=this.model,j=b.length,k=i.make_barrier(),l=i.contract_is_finished;return k&&f(k),l?void c(i,b):void(0!==j&&(d(j),1===j&&e(j)))}};var s=function(a,b){function c(c){function d(a){var c=l["default"].utc(1e3*a.epoch).format("dddd, MMM D, HH:mm:ss"),d=b.symbol_name,f=addComma((+a.quote).toFixed(e));return c+"<br/>"+d+" "+f}var e=o["default"].digits_after_decimal(b.pip,b.symbol),f=d(c);a.ticks.array.push({quote:+c.quote,epoch:+c.epoch,number:a.ticks.array.length+1,tooltip:f,decimal_digits:e})}function d(){var b=a.ticks.array.slice();a.ticks.array=[].concat(j(b))}function e(a,c){m["default"].send({ticks_history:c,end:"latest",start:a,style:"ticks",count:5e3}).then(function(a){s=!1,a.history.prices.forEach(function(c,d){q.push({epoch:a.history.times[d],quote:c,symbol:b.symbol})}),q.sort(function(a,b){return+a.epoch-+b.epoch})})["catch"](function(){return k["default"].growl.error({message:data.error.message})})}var f=void 0,g=void 0,h=void 0,i=b.tick_count,n=function(b){var e=+b.epoch>=+f.entry_tick_time,g=!a.ticks.array.some(function(a){return 1*a.epoch===1*b.epoch}),h=g&&!a.ticks.contract_is_finished&&e;if(h){var j="open"!==f.status&&!a.ticks.contract_is_finished;a.buy.barrier=f.barrier?+f.barrier:null,j&&(p(f),d()),i--,i>-1&&c(b)}},p=function(c){function d(){var a=b.contract_id;m["default"].events.off("proposal_open_contract",g),m["default"].events.off("tick",h),m["default"].proposal_open_contract.forget(a)}d(),a.ticks.contract_is_finished=!0,a.ticks.exit_tick_time=c.exit_tick_time?c.exit_tick_time:null,a.ticks.status=c.status,a.buy.update(),a.back.visible=!0};g=m["default"].events.on("proposal_open_contract",function(a){var c=a.proposal_open_contract.contract_id!==b.contract_id;if(!c)return a.error?void t(a):void(f=a.proposal_open_contract)});var q=[],r=void 0,s=!1;h=m["default"].events.on("tick",function(a){var c=b.symbol!==a.tick.symbol;if(!c){r||(r=a.tick.epoch);var d=f&&f.entry_tick_time;if(!d)return void q.push(a.tick);var g=r>d;if(g&&(s=!0,r=d,e(d,b.symbol)),s)return void q.push(a.tick);q.length>0&&(q.forEach(function(a){return n(a)}),q=[]),n(a.tick)}});var t=function(a){k["default"].growl.error({message:a.error.message}),m["default"].proposal_open_contract.forget(a.echo_req.contract_id),m["default"].proposal_open_contract.subscribe(a.echo_req.contract_id)}},t=a.init=function(a,b,c,d){r=a.display_decimals||3;var e=k["default"](p["default"]).i18n(),f=a.buy,g=(o["default"].digits_after_decimal(b.pip,b.symbol),{title:{text:"Contract Confirmation".i18n()},buy:{barrier:null,message:f.longcode,balance_after:f.balance_after,buy_price:(+f.buy_price).toFixed(currencyFractionalDigits()),purchase_time:f.purchase_time,start_time:f.start_time,transaction_id:f.transaction_id,payout:(+f.payout).toFixed(currencyFractionalDigits()),currency:b.currency,potential_profit:(f.payout-f.buy_price).toFixed(currencyFractionalDigits()),potential_profit_text:"Profit".i18n(),show_result:!1},spreads:{amount_per_point:f.amount_per_point||"0",stop_loss_level:f.stop_loss_level||"0",stop_profit_level:f.stop_profit_level||"0"},ticks:{array:[],contract_is_finished:!1,exit_tick_time:null,is_path_dependent:null,make_exit_spot:function(a){return{value:a,label:"Exit Spot".i18n(),dashStyle:"Dash"}},make_entry_spot:function(a){return{value:a,label:"Entry Spot".i18n()}},make_barrier:function(){var a=g.buy.barrier;return a?{value:+a,label:"Barrier".i18n()+" ('"+addComma(a.toFixed(r))+")",id:"plot-barrier-y"}:null},tick_count:b.tick_count,value:(b.digits_value||"0")+"",category:b.category,category_display:b.category_display,status:"waiting",chart_visible:b.show_tick_chart},arrow:{visible:!b.show_tick_chart&&"digits"!==b.category.contract_category},back:{visible:!1}});q["default"].isLookback(b.category_display.contract_type)&&(g.buy.payout=q["default"].formula(b.category_display.contract_type,b.amount),g.buy.potential_profit=void 0),g.buy.update=function(){var a=g.ticks.status;g.title.text={waiting:"Contract Confirmation".i18n(),won:"This contract won".i18n(),lost:"This contract lost".i18n()}[a],"lost"===a&&(g.buy.potential_profit=(-g.buy.buy_price).toFixed(currencyFractionalDigits()),g.buy.payout=0..toFixed(currencyFractionalDigits()),g.buy.potential_profit_text="Lost"),"won"===a&&(g.buy.balance_after=1*f.balance_after+1*g.buy.payout,m["default"].sell_expired()),g.buy.show_result=!0},g.back.onclick=function(){return d(e)},g.arrow.onclick=function(a){var c=k["default"](a.target);c.hasClass("disabled")||(c.addClass("disabled"),require(["viewtransaction/viewTransaction"],function(a){a.init(b.contract_id,b.transaction_id).then(function(){return c.removeClass("disabled")})}))};n["default"].bind(e[0],g);g.arrow.visible?g.back.visible=!0:s(g,b),c(e)};a["default"]={init:t}});