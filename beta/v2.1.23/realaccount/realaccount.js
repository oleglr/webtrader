define(["jquery","websockets/binary_websockets","windows/windows","common/rivetsExtra","lodash","moment","navigation/navigation"],function(a,b,c,d,e,f,g){function h(a){m=a,a.click(function(){k?k.moveToTop():require(["text!realaccount/realaccount.html"],function(a){g.getLandingCompany().then(function(b){i(a,b)})["catch"](n)})})}function i(b,d){b=a(b).i18n();var e={"upgrade-mlt":"Real Money Account Opening".i18n(),"upgrade-mf":"Financial Account Opening form".i18n()}[d];k=c.createBlankWindow(b,{title:e,resizable:!1,collapsable:!1,minimizable:!0,maximizable:!1,width:360,height:1010,"data-authorized":!0,close:function(){k.dialog("destroy"),k.trigger("dialogclose"),k.remove(),k=null},open:function(){},destroy:function(){l&&l.unbind(),l=null}}),j(b,d),k.dialog("open");var f=k.dialog("widget").offset();f.top=110,k.dialog("option","position",{my:f.left,at:f.top}),k.dialog("widget").css({left:f.left+"px",top:f.top+"px"}),k.fixFooterPosition()}function j(c,g){var h=(b.app_id,{route:{value:"user"},empty_fields:{validate:!1,clear:e.debounce(function(){h.empty_fields.validate=!1},4e3),show:function(){h.empty_fields.validate=!0,h.empty_fields.clear()}},what_todo:g,risk:{visible:!1},user:{disabled:!1,accepted:"upgrade-mf"===g,salutation:"Mr",salutation_array:["Mr","Mrs","Ms","Miss"],first_name:"",last_name:"",date_of_birth:"",yearRange:"-100:+0",showButtonPanel:!1,residence:"-",residence_name:"-",address_line_1:"",address_line_2:"",city_address:"",state_address:"-",state_address_array:[{text:"-",value:"-"}],address_postcode:"",phone:"",secret_question_inx:5,secret_question_array:["Mother's maiden name","Name of your pet","Name of first love","Memorable town/city","Memorable date","Favourite dish","Brand of first car","Favourite artist"],secret_answer:""},financial:{experience_array:["0-1 year","1-2 years","Over 3 years"],frequency_array:["0-5 transactions in the past 12 months","6-10 transactions in the past 12 months","40 transactions or more in the past 12 months"],forex_trading_experience:"",forex_trading_frequency:"",indices_trading_experience:"",indices_trading_frequency:"",commodities_trading_experience:"",commodities_trading_frequency:"",stocks_trading_experience:"",stocks_trading_frequency:"",other_derivatives_trading_experience:"",other_derivatives_trading_frequency:"",other_instruments_trading_experience:"",other_instruments_trading_frequency:"",employment_industry_array:["Construction","Education","Finance","Health","Tourism","Other"],employment_industry:"",education_level_array:["Primary","Secondary","Tertiary"],education_level:"",income_source_array:["Salaried Employee","Self-Employed","Investments & Dividends","Pension","Other"],income_source:"",net_income_array:["Less than $25,000","$25,000 - $50,000","$50,001 - $100,000","$100,001 - $500,000","Over $500,000"],net_income:"",estimated_worth_array:["Less than $100,000","$100,000 - $250,000","$250,001 - $500,000","$500,001 - $1,000,000","Over $1,000,000"],estimated_worth:"",occupation_array:["Chief Executives, Senior Officials and Legislators","Managers","Professionals","Clerks","Personal Care, Sales and Service Workers","Agricultural, Forestry and Fishery Workers","Craft, Metal, Electrical and Electronics Workers","Plant and Machine Operators and Assemblers","Mining, Construction, Manufacturing and Transport Workers","Armed Forces","Government Officers","Others"],occupation:"",accepted:!1,disabled:!1}});h.user.is_valid=function(){var a=h.user;return""!==a.first_name&&""!==a.last_name&&f(a.date_of_birth,"YYYY-MM-DD",!0).isValid()&&"-"!==a.residence&&""!==a.address_line_1&&""!==a.city_address&&/^[^+]{0,20}$/.test(a.address_postcode)&&""!==a.phone&&/^\+?[0-9\s]{6,35}$/.test(a.phone)&&/.{4,8}$/.test(a.secret_answer)},h.user.click=function(){return h.user.is_valid()?"upgrade-mlt"===h.what_todo?void h.user.new_account_real():void h.route.update("financial"):void h.empty_fields.show()},h.user.new_account_real=function(){var c=h.user,d={new_account_real:1,salutation:c.salutation,first_name:c.first_name,last_name:c.last_name,date_of_birth:c.date_of_birth,residence:c.residence,address_line_1:c.address_line_1,address_line_2:c.address_line_2||void 0,address_city:c.city_address,address_state:c.state_address||void 0,address_postcode:c.address_postcode||void 0,phone:c.phone,secret_question:c.secret_question_array[c.secret_question_inx],secret_answer:c.secret_answer.replace('""',"'")};h.user.disabled=!0,b.send(d).then(function(c){h.user.disabled=!1;var d=c.new_account_real;return oauth=local_storage.get("oauth"),oauth.push({id:d.client_id,token:d.oauth_token,is_virtual:0}),local_storage.set("oauth",oauth),a.growl.notice({message:"Account successfully created"}),a.growl.notice({message:"Switching to your new account ..."}),b.switch_account(d.client_id).then(function(){k.dialog("close"),m.hide()})})["catch"](function(a){h.user.disabled=!1,n(a)})},h.financial.all_selected=function(){var a=h.financial;return""!==a.forex_trading_experience&&""!==a.forex_trading_frequency&&""!==a.indices_trading_experience&&""!==a.indices_trading_frequency&&""!==a.commodities_trading_experience&&""!==a.commodities_trading_frequency&&""!==a.stocks_trading_experience&&""!==a.stocks_trading_frequency&&""!==a.other_derivatives_trading_experience&&""!==a.other_derivatives_trading_frequency&&""!==a.other_instruments_trading_experience&&""!==a.other_instruments_trading_frequency&&""!==a.employment_industry&&""!==a.occupation&&""!==a.education_level&&""!==a.income_source&&""!==a.net_income&&""!==a.estimated_worth},h.financial.click=function(){return h.financial.all_selected()?h.financial.accepted?void(h.risk.visible=!0):void a.growl.error({message:"Binary.com terms and conditions unchecked."}):(h.empty_fields.show(),void a.growl.error({message:"Not all financial information are completed"}))},h.financial.create_request=function(){var a=h.user,b=h.financial,c={new_account_maltainvest:1,salutation:a.salutation,first_name:a.first_name,last_name:a.last_name,date_of_birth:a.date_of_birth,residence:a.residence,address_line_1:a.address_line_1,address_line_2:a.address_line_2||void 0,address_city:a.city_address,address_state:a.state_address||void 0,address_postcode:a.address_postcode||void 0,phone:a.phone,secret_question:a.secret_question_array[a.secret_question_inx],secret_answer:a.secret_answer.replace('""',"'"),affiliate_token:"",forex_trading_experience:b.forex_trading_experience,forex_trading_frequency:b.forex_trading_frequency,indices_trading_experience:b.indices_trading_experience,indices_trading_frequency:b.indices_trading_frequency,commodities_trading_experience:b.commodities_trading_experience,commodities_trading_frequency:b.commodities_trading_frequency,stocks_trading_experience:b.stocks_trading_experience,stocks_trading_frequency:b.stocks_trading_frequency,other_derivatives_trading_experience:b.other_derivatives_trading_experience,other_derivatives_trading_frequency:b.other_derivatives_trading_frequency,other_instruments_trading_experience:b.other_instruments_trading_experience,other_instruments_trading_frequency:b.other_instruments_trading_frequency,employment_industry:b.employment_industry,occupation:b.occupation,education_level:b.education_level,income_source:b.income_source,net_income:b.net_income,estimated_worth:b.estimated_worth,accept_risk:1};return c},h.financial.new_account_maltainvest=function(){h.financial.create_request()},h.risk.accept=function(){var c=h.financial.create_request();h.risk.visible=!1,h.financial.disabled=!0,b.send(c).then(function(c){var d=c.new_account_maltainvest;return oauth=local_storage.get("oauth"),oauth.push({id:d.client_id,token:d.oauth_token,is_virtual:0}),local_storage.set("oauth",oauth),a.growl.notice({message:"Account successfully created"}),a.growl.notice({message:"Switching to your new account ..."}),b.switch_account(d.client_id).then(function(){k.dialog("close"),m.hide()})})["catch"](function(a){h.financial.disabled=!1,n(a)})},h.risk.decline=function(){h.risk.visible=!1},h.route.update=function(a){var b={user:1010,financial:1540};h.route.value=a,k.dialog("option","height",b[a]),k.dialog("widget").trigger("dialogresizestop")},l=d.bind(c[0],h);var i=b.send({get_settings:1}).then(function(a){a=a.get_settings,h.user.salutation=a.salutation||h.user.salutation,h.user.first_name=a.first_name,h.user.last_name=a.last_name,h.user.date_of_birth=f.unix(a.date_of_birth).format("YYYY-MM-DD"),h.user.address_line_1=a.address_line_1,h.user.address_line_2=a.address_line_2,h.user.city_address=a.address_city,h.user.state_address=a.address_state,h.user.address_postcode=a.address_postcode,h.user.phone=a.phone,h.user.residence=a.country_code,h.user.residence_name=a.country})["catch"](n);i.then(function(){return b.cached.send({residence_list:1})}).then(function(a){var b=e.find(a.residence_list,{value:h.user.residence});h.user.phone=h.user.phone?h.user.phone:"+"+b.phone_idd})["catch"](n),i.then(function(){return b.cached.send({states_list:h.user.residence})}).then(function(a){h.user.state_address_array=a.states_list,h.user.state_address=a.states_list[0].value})["catch"](n)}require(["text!realaccount/realaccount.html"]),require(["css!realaccount/realaccount.css"]);var k=null,l=null,m=null,n=function(b){a.growl.error({message:b.message})};return{init:h}});