(this["webpackJsonpcovid-dashboard"]=this["webpackJsonpcovid-dashboard"]||[]).push([[0],{179:function(e,a,t){e.exports=t(332)},184:function(e,a,t){},185:function(e,a,t){},332:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),o=t(10),i=t.n(o),l=(t(184),t(185),t(19)),c=t(92),s=t(373),m=t(374),d=t(376),u=t(375),p=t(372),f=t(377),h=t(378),b=t(371),g=t(382),v=t(370),E=t(369),y=t(166),x=t.n(y),k=t(93),N=t(357),w=t(22),C=t(381),O=t(161),A=t.n(O),S=t(47),I=t.n(S),T=t(162),j=t.n(T),M=t(163),R=t.n(M),D=t(165),B=t.n(D),P=t(164),H=t.n(P),W=t(360),Y=t(361),L=t(362),z=t(363),F=t(364),G=t(380),_=t(365),U=t(158),J=t.n(U),K=t(23),X=t.n(K),Z=t(40),q="https://api.covid19india.org/zones.json",V="https://api.covid19india.org/data.json",Q="https://api.covid19india.org/updatelog/log.json",$=t(64),ee=t.n($),ae=function(){return ee.a.get(q).then((function(e){return e.data}))},te=function(){return ee.a.get(Q).then((function(e){return e.data}))},re=function(){return ee.a.get(V).then((function(e){return e.data}))},ne=t(379),oe=t(359),ie=Object(N.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"}}})),le=function(){var e=ie(),a=n.a.useState(!0),t=Object(l.a)(a,2),r=t[0],o=t[1];return n.a.createElement("div",null,n.a.createElement(ne.a,{className:e.backdrop,open:r,onClick:function(){o(!1)}},n.a.createElement(oe.a,{color:"inherit"})))},ce=Object(N.a)((function(e){return{content:{padding:e.spacing(3),fontSize:"1rem",lineHeight:"0.2rem",letterSpacing:"1.1px"},boxBorderConfirm:{border:"2px solid #000FF0",backgroundColor:"#000FF1",flexGrow:1,borderRadius:"5px 3px",textAlign:"center",padding:"0.1rem"},boxBorderFatal:{border:"2px solid #ff2424",backgroundColor:"#ff3838",flexGrow:1,borderRadius:"5px 3px",textAlign:"center",padding:"0.1rem"},boxBorderActive:{border:"2px solid #7a7a7a",backgroundColor:"#a0a39e",flexGrow:1,borderRadius:"5px 3px",textAlign:"center",padding:"0.1rem"},boxBorderRecover:{border:"2px solid #89f564",backgroundColor:"#0cad00",borderRadius:"5px 3px",textAlign:"center",padding:"0.1rem"},space:{flexGrow:"0.2"},fontSize2rem:{fontSize:"2rem"},fontSize15rem:{fontSize:"1.5rem",fontWeight:"bolder"},flexBox:{display:"flex",overflowX:"scroll",justifyContent:"space-between","&::-webkit-scrollbar":{display:"none",msOverflowStyle:"none",scrollbarWidth:"none"}},table:{overflowX:"scroll"},tableCell:{paddingRight:"0",paddingLeft:"0"},toolbar:e.mixins.toolbar}})),se=function(e){var a=e.data,t=ce(),r=a[a.length-1],o=parseInt(r.totalconfirmed)-(parseInt(r.totalrecovered)+parseInt(r.totaldeceased)),i=parseInt(r.dailyconfirmed)-(parseInt(r.dailyrecovered)+parseInt(r.dailydeceased));return n.a.createElement(W.a,{maxWidth:"xl",className:t.flexBox},n.a.createElement("div",{className:t.boxBorderConfirm},n.a.createElement("p",{className:t.fontSize15rem},r.totalconfirmed),n.a.createElement("p",{className:t.fontSize2rem},"Total Cases "),n.a.createElement("p",null," ",r.dailyconfirmed," ",n.a.createElement(I.a,null))),n.a.createElement("div",{className:t.space}),n.a.createElement("div",{className:t.boxBorderFatal},n.a.createElement("p",{className:t.fontSize15rem},r.totaldeceased),n.a.createElement("p",{className:t.fontSize2rem},"Fatalities"),n.a.createElement("p",null," ",r.dailydeceased," ",n.a.createElement(I.a,null))),n.a.createElement("div",{className:t.space}),n.a.createElement("div",{className:t.boxBorderRecover},n.a.createElement("p",{className:t.fontSize15rem},r.totalrecovered),n.a.createElement("p",{className:t.fontSize2rem},"Recoveries"),n.a.createElement("p",null,r.dailyrecovered," ",n.a.createElement(I.a,null))),n.a.createElement("div",{className:t.space}),n.a.createElement("div",{className:t.boxBorderActive},n.a.createElement("p",{className:t.fontSize15rem},o),n.a.createElement("p",{className:t.fontSize2rem},"Active Cases"),n.a.createElement("p",null,i," ",i>0?n.a.createElement(I.a,null):n.a.createElement(J.a,null))))},me=function(e){var a=e.data,t=ce(),o=Object(r.useState)("state"),i=Object(l.a)(o,2),c=i[0],s=i[1],m=Object(r.useState)("asc"),d=Object(l.a)(m,2),u=d[0],p=d[1],f=Object(r.useState)("string"),h=Object(l.a)(f,2),b=h[0],g=h[1],v=a.filter((function(e){return"TT"===e.statecode}))[0],E=(a=he(a.filter((function(e){return"TT"!==e.statecode})),fe(u,c,b))).map((function(e,a){return n.a.createElement(de,{key:a,data:e})}));E.push(n.a.createElement(de,{key:46,data:v}));return n.a.createElement(Y.a,{stickyHeader:!0,className:t.table},n.a.createElement(L.a,null,n.a.createElement(z.a,null,ue.map((function(e){return n.a.createElement(F.a,{key:e.id,align:e.numeric?"right":"left",sortDirection:c===e.id&&u,onClick:function(){return function(e,a){e===c?p("asc"===u?"desc":"asc"):(p("asc"),s(e)),g(a)}(e.id,e.dataType)},className:t.tableCell},e.label,n.a.createElement(G.a,{active:c===e.id,direction:c===e.id?u:"asc"}))})))),n.a.createElement(_.a,null,E))},de=function(e){var a=e.data,t=ce();return n.a.createElement(z.a,{hover:!0},n.a.createElement(F.a,{className:t.tableCell},a.state),n.a.createElement(F.a,{className:t.tableCell},a.confirmed),n.a.createElement(F.a,{className:t.tableCell},parseInt(a.confirmed)-(parseInt(a.active)+parseInt(a.deaths))),n.a.createElement(F.a,{className:t.tableCell},a.deaths),n.a.createElement(F.a,{className:t.tableCell},a.active),n.a.createElement(F.a,{className:t.tableCell},X()(a.lastupdatedtime,"DD/MM/YYYY HH:mm:ss").format("Do MMMM, HH:mm")))},ue=[{id:"state",dataType:"string",label:"State Name"},{id:"confirmed",dataType:"number",label:"Confirmed"},{id:"recovered",dataType:"number",label:"Recovered"},{id:"deaths",dataType:"number",label:"Fatalities"},{id:"active",dataType:"number",label:"Active"},{id:"lastupdatedtime",dataType:"date",label:"Last Updated"}],pe=function(e,a,t,r){if("string"===r){if(a[t]<e[t])return-1;if(a[t]>e[t])return 1}if("number"===r){if(parseInt(a[t])<parseInt(e[t]))return-1;if(parseInt(a[t])>parseInt(e[t]))return 1}if("date"===r){if(X()(a[t],"DD/MM/YYYY HH:mm:ss").isBefore(X()(e[t],"DD/MM/YYYY HH:mm:ss")))return-1;if(X()(a[t],"DD/MM/YYYY HH:mm:ss").isAfter(X()(e[t],"DD/MM/YYYY HH:mm:ss")))return 1}return 0},fe=function(e,a,t){return"desc"===e?function(e,r){return pe(e,r,a,t)}:function(e,r){return-pe(e,r,a,t)}},he=function(e,a){var t=e.map((function(e,a){return[e,a]}));return t.sort((function(e,t){var r=a(e[0],t[0]);return 0!==r?r:e[1]-t[1]})),t.map((function(e){return e[0]}))},be=function(e){var a=ce(),t=Object(Z.a)(V,re,{revalidateOnReconnect:!0}).data;return n.a.createElement(W.a,{maxWidth:"md"},n.a.createElement("div",{className:a.toolbar}),n.a.createElement(k.a,{variant:"h4",align:"center"},"Overview Of Cases In India"),n.a.createElement(k.a,{variant:"subtitle2",align:"center"},t?"Last Updated On : ".concat(t.cases_time_series[t.cases_time_series.length-1].date):""),n.a.createElement("div",{className:a.toolbar}),t?n.a.createElement(se,{data:t.cases_time_series}):n.a.createElement(le,null),n.a.createElement(k.a,{variant:"subtitle1",align:"right",color:"error"}," *Includes Migrated/Foreign Cases"),n.a.createElement(k.a,{variant:"h4",align:"center"},n.a.createElement("div",{className:a.toolbar}),"Overview Of Cases - State Wise",n.a.createElement("div",{className:a.toolbar})),t?n.a.createElement(me,{data:t.statewise}):n.a.createElement(le,null))},ge=t(159),ve=t.n(ge),Ee=t(45),ye=ve()((function(e){return{listItem:{border:"2px solid gray",opacity:.8,"&:hover":{transform:"translateY(1px)"},borderRadius:"3px 6px",margin:"0.5rem 0",padding:"1rem"},toolbar:e.mixins.toolbar}})),xe=function(e){var a=ye(),t=Object(Z.a)(Q,te,{revalidateOnReconnect:!0}).data;if(t){var r=t.slice(-10).reverse().map((function(e,t){var r,o=(r=e.timestamp,X()().diff(1e3*r,"minutes"));if(o>60){var i=parseInt(o/60),l=o%60;return n.a.createElement("div",{className:a.listItem,key:t},n.a.createElement(k.a,{variant:"subtitle1"},i," hours and ",l," minutes ago"),n.a.createElement(k.a,{variant:"body2"},e.update))}return n.a.createElement("div",{key:t,className:a.listItem},n.a.createElement(k.a,{variant:"subtitle1"},o," minutes ago"),n.a.createElement(k.a,{variant:"body2"},e.update))}));return n.a.createElement(W.a,{maxWidth:"md"},n.a.createElement("div",{className:a.toolbar}),n.a.createElement(k.a,{variant:"h4",style:{textAlign:"center"}},"Recent Updates"),n.a.createElement("div",{className:a.toolbar}),n.a.createElement(Ee.Trail,{items:r,keys:function(e){return e.key},from:{opacity:0},to:{opacity:1}},(function(e){return function(a){return n.a.createElement("div",{style:a},e)}})))}return n.a.createElement(le,null)},ke=t(368),Ne=Object(N.a)((function(e){return{toolbar:e.mixins.toolbar,heading:{margin:"1vh",borderBottom:"4px solid green",borderBottomLeftRadius:"5px",borderBottomRightRadius:"5px",width:"fit-content"},margin:{marginTop:e.spacing(2),marginBottom:e.spacing(2)},marginLeft:{marginLeft:e.spacing(2)},button:{textDecoration:"none",color:"white"},imageResponsive:{width:"100%",height:"auto"}}})),we=function(e){var a=Ne();return n.a.createElement(W.a,{maxWidth:"md"},n.a.createElement("div",{className:a.toolbar}),n.a.createElement(k.a,{variant:"h4"},"Help India to Fight Coronavirus!"),n.a.createElement(k.a,{variant:"h5",color:"secondary",className:a.margin},"Donate to PMCARES Fund to help the Govt of India to help you."),n.a.createElement(k.a,{className:a.heading,variant:"h5"},"About PMCARES"),n.a.createElement(C.a,{m:4},n.a.createElement(k.a,{variant:"body1",component:"p"},"PM - CARES fund is aimed at strengthening the fight against COVID-19. It will furthur availability of quality treatment and encourage research on ways. I urge people from all walks of life to contribute to PM - CARES. Together, let's solve the challenges of the present and protect the future.")),n.a.createElement(k.a,{variant:"h5",component:"p"},"Have got any Ideas to fight",n.a.createElement("span",{style:{color:"red"}},"#Coronavirus"),n.a.createElement(ke.a,{color:"secondary",variant:"contained",className:a.marginLeft},n.a.createElement("a",{href:"https://www.mygov.in/group-issue/share-your-ideas-suggestions-help-fight-coronavirus/",target:"_blank",rel:"noopener noreferrer",className:a.button}," Give Idea "))),n.a.createElement(k.a,{variant:"body1",component:"p",className:a.margin},"For More Details Visit the PMCARES website."),n.a.createElement(C.a,null,n.a.createElement("img",{src:"images/pmcares.jpg",alt:"PM CARES Details",className:a.imageResponsive})),n.a.createElement(C.a,{style:{textAlign:"center"}},n.a.createElement(ke.a,{style:{backgroundColor:"#4caf50"},variant:"contained"}," ",n.a.createElement("a",{href:"https://www.pmcares.gov.in",target:"_blank",rel:"noopener noreferrer",className:a.button}," Open PMCARES "))))},Ce=t(383),Oe=[{id:1,name:"Cough",image:"/images/cough.jpg",description:"A cough is a reflex action that clears your airway of irritants and mucus. There are two types of cough: productive and nonproductive. A productive cough produces phlegm or mucus, clearing it from the lungs. A nonproductive cough, also known as a dry cough, doesn\u2019t produce phlegm or mucus. If due to corona virus then, dry cough is prevalent in coronavirus patients."},{id:2,name:"Fever",description:"As a person\u2019s body temperature increases, they may feel cold until it levels off and stops rising.\n\n        Eating, exercise, sleeping, the time of day, and individual factors can also affect temperature.\n        \n        When an infection occurs, the immune system will launch an attack to try to remove the cause. A high body temperature is a normal part of this reaction.\n        \n        A fever will usually resolve on its own. However, if body temperature rises too high, it may be a due to coronavirus, consult a doctor immediately via phone",image:"/images/fever.jpg"},{id:3,name:"Chills",description:"\n        The term \u201cchills\u201d refers to a feeling of being cold without an apparent cause. You get this feeling when your muscles repeatedly expand and contract and the vessels in your skin constrict. Chills can occur with a fever and cause shivering or shaking. This symptom was recently added to the common symptoms of coronavirus",image:""},{id:4,name:"Muscle Pain",description:"The various parts of the body experience some pain when having coronavirus",image:""},{id:5,name:"Shortness Of Breath",description:"Shortness of breath, or dyspnea, is an uncomfortable condition that makes it difficult to fully get air into your lungs. Problems with your heart and lungs can harm your breathing.\n\n        Some people may experience shortness of breath suddenly for short periods of time. Others may experience it over the long term \u2014 several weeks or more. In coronavirus patients all breathing related problems may occur including shortness of breath.",image:""},{id:6,name:"Sore Throat",description:"A sore throat is a painful, dry, or scratchy feeling in the throat.\n\n        Pain in the throat is one of the most common symptoms. It accounts for more than 13 million visits to doctor\u2019s offices each year.\n        \n        Most sore throats are caused by infections, or by environmental factors like dry air. Although a sore throat can be uncomfortable, it\u2019ll usually go away on its own.",image:""},{id:7,name:"Loss Of Smell",description:"Covid 19 is a respiratory disease. Hence, it was seen in several patients that they loss the smell and taste. Doctors are worried that some patients may never get back their sense of smell."}],Ae=[{id:1,heading:"Wash your hands",description:"Wash your hands with soap and running water when hands are visibily dirty. Use alcohol based sanitizer if not visibily dirty. Wash your hands for atleast 20s when washing using the soap."},{id:2,heading:"Protect Your self",description:"Wash Your hands Thoroughly : \n                        - after coughing and sneezing\n                        - when caring for the sick\n                        - before, during and after preparing food\n                        - before eating\n                        - after toilet use\n                        - when hands are visibily dirty\n                        - after handling animals or animal waste"},{id:3,heading:"Protect Others",description:"When coughing and sneezing cover mouth and nose with flexed elbow or tissue.\n                       Throw the tissue in closed bin immediately after use.\n                       Clean hands with alcohol based sanitizer or soap and water after sneezing."},{id:4,heading:"Eat Healthy",description:"Avoid junk foods, or non nutritous food. Eat foods which increase stamina. Prefer home cooked food always."},{id:5,heading:"Stay Physically Active",description:"Excercise Daily as it boosts metabolism and immunity."},{id:6,heading:"Quitting Tobacco",description:"This is a very good time to quit the use of Tobacco for societal well being."}],Se=Object(N.a)((function(e){return{root:{marginTop:"3vh"},leftBorder:{borderLeft:"1rem solid green",width:"fit-content",marginRight:"1rem"},chips:{display:"flex",justifyContent:"center",flexWrap:"wrap","& > *":{margin:e.spacing(.5)}},hover:{"&:hover":{backgroundColor:"#2290A0",transform:"translateY(-1px)"}},inline:{display:"inline"},toolbar:e.mixins.toolbar}})),Ie=function(e){var a=e.selected;return n.a.createElement(W.a,{maxWidth:"sm"},Oe[a].description.split(".").map((function(e,a){return n.a.createElement(k.a,{key:a,variant:"body1",color:"textSecondary"},e," ")})))},Te=function(e){var a=Se(),t=Object(r.useState)(0),o=Object(l.a)(t,2),i=o[0],c=o[1],s=Ae.map((function(e,t){return n.a.createElement(g.a,{key:e.id},n.a.createElement(E.a,{primary:n.a.createElement(n.a.Fragment,null,n.a.createElement(k.a,{variant:"h5",color:"primary"},e.heading)),secondary:n.a.createElement(n.a.Fragment,null,n.a.createElement(k.a,{component:"span",variant:"body1",className:a.inline,color:"textSecondary"},e.description))}))}));return n.a.createElement(C.a,{textAlign:"center"},n.a.createElement(W.a,{maxWidth:"md",className:a.root},n.a.createElement("div",{className:a.toolbar}),n.a.createElement(k.a,{variant:"h4"},n.a.createElement("span",{className:a.leftBorder}),"Precautions of Coronavirus"),n.a.createElement(W.a,{maxWidth:"md"},n.a.createElement(Ee.Trail,{items:s,keys:function(e){return e.key},from:{opacity:0},to:{opacity:1}},(function(e){return function(a){return n.a.createElement("div",{style:a},e)}}))),n.a.createElement(k.a,{variant:"h4"},n.a.createElement("span",{className:a.leftBorder}),"Symptoms Of Coronavirus"),n.a.createElement("div",{className:a.toolbar}),n.a.createElement("div",{className:a.chips},Oe.map((function(e,t){return i===t?n.a.createElement(Ce.a,{key:e.id,label:e.name,className:a.hover,onClick:function(){return c(t)},color:"primary"}):n.a.createElement(Ce.a,{key:e.id,label:e.name,className:a.hover,onClick:function(){return c(t)}})}))),n.a.createElement("div",{className:a.toolbar}),n.a.createElement(Ie,{selected:i})))},je=t(384),Me={AP:"Andhra Pradesh",AR:"Arunachal Pradesh",AS:"Assam",BR:"Bihar",CT:"Chhattisgarh",GA:"Goa",GJ:"Gujarat",HR:"Haryana",HP:"Himachal Pradesh",JH:"Jharkhand",KA:"Karnataka",KL:"Kerala",MP:"Madhya Pradesh",MH:"Maharashtra",MN:"Manipur",ML:"Meghalaya",MZ:"Mizoram",NL:"Nagaland",OR:"Odisha",PB:"Punjab",RJ:"Rajasthan",SK:"Sikkim",TN:"Tamil Nadu",TG:"Telangana",TR:"Tripura",UT:"Uttarakhand",UP:"Uttar Pradesh",WB:"West Bengal",AN:"Andaman and Nicobar Islands",CH:"Chandigarh",DN:"Dadra and Nagar Haveli and Daman and Diu",DL:"Delhi",JK:"Jammu and Kashmir",LA:"Ladakh",LD:"Lakshadweep",PY:"Puducherry",TT:"Total",UN:"Unassigned"},Re=Object(N.a)((function(e){return{toolbar:e.mixins.toolbar,chips:{display:"flex",justifyContent:"center",flexWrap:"wrap","& > *":{margin:e.spacing(.5)},fontSize:"2rem"},hover:{"&:hover":{backgroundColor:"#2290A0",transform:"translateY(-1px)"}}}})),De=function(e){var a=e.state,t=Re(),r=a.districts.map((function(e){return"Green"===e.zone?n.a.createElement(Ce.a,{key:e.districtcode,style:{backgroundColor:"#0F0",color:"#000"},label:e.district,className:t.hover}):"Orange"===e.zone?n.a.createElement(Ce.a,{key:e.districtcode,style:{backgroundColor:"#FF8C00",color:"#000"},label:e.district,className:t.hover}):n.a.createElement(Ce.a,{key:e.districtcode,style:{backgroundColor:"#F00"},label:e.district,className:t.hover})}));return n.a.createElement(W.a,{maxWidth:"sm",className:t.chips},r,n.a.createElement("div",{className:t.toolbar}))},Be=function(e){var a=Re(),t=Object(Z.a)(q,ae,{revalidateOnReconnect:!0}).data,o=Object(r.useState)("AP"),i=Object(l.a)(o,2),c=i[0],s=i[1];if(t){var m=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Me;if(!e)return{};var t=e.reduce((function(e,a){return e[a.statecode]||(e[a.statecode]={name:"",districts:[]}),e[a.statecode].districts.push(a),e}),[]),r=Object.keys(t);return r.forEach((function(e){t[e].name=a[e]})),t}(t.zones),d=Object.keys(m).map((function(e){return e===c?n.a.createElement(Ce.a,{key:e,label:m[e].name,avatar:n.a.createElement(je.a,null,m[e].districts.length),onClick:function(){return s(e)},className:a.hover,variant:"outlined",color:"primary"}):n.a.createElement(Ce.a,{key:e,label:m[e].name,avatar:n.a.createElement(je.a,null,m[e].districts.length),onClick:function(){return s(e)},className:a.hover,variant:"outlined"})}));return n.a.createElement(W.a,{maxWidth:"md"},n.a.createElement("div",{className:a.toolbar}),n.a.createElement(k.a,{align:"center",variant:"h4"}," Zone Classification in India "),n.a.createElement("div",{className:a.toolbar}),n.a.createElement(Ee.Spring,{native:!0,from:{opacity:0},to:{opacity:1}},(function(e){return n.a.createElement(Ee.animated.div,{style:e,className:a.chips},d)})),n.a.createElement("div",{className:a.toolbar}),n.a.createElement(De,{state:m[c]}))}return n.a.createElement(le,null)},Pe=t(108),He=Object(N.a)((function(e){return{root:{margin:"0 auto"},toolbar:e.mixins.toolbar,tooltip:{position:"relative",width:"fit-content",backgroundColor:"black","&::after":{content:'" "',position:"absolute",top:"100%",left:"50%",marginLeft:"-5px",borderWidth:"5px",borderStyle:"solid",borderColor:"black transparent transparent transparent"}},tooltiptext:{color:"white",textAlign:"left",padding:"5px 2px"},span:{width:"1rem",height:"1rem",paddingLeft:"10px",display:"inline-block"}}})),We=function(e){var a=e.data,t=e.parameter,r=e.label,o=e.backgroundColor,i=e.borderColor,l={labels:a.map((function(e){return e.date})),datasets:[{label:r,data:a.map((function(e){return e[t]})),backgroundColor:a.map((function(e){return o})),borderColor:a.map((function(e){return i})),borderWidth:1,hoverBackgroundColor:"white",hoverBorderColor:"white"}]};return n.a.createElement(Pe.a,{data:l,width:100,height:50,options:{maintainAspectRatio:!0}})},Ye=function(e){var a=e.data,t=e.labels,o=He(),i=[],c=a[0],s=Object(r.useState)(!1),m=Object(l.a)(s,2),d=m[0],u=m[1],p=Object(r.useState)({top:0,left:0,percent:0,value:0,color:"",label:""}),f=Object(l.a)(p,2),h=f[0],b=f[1];i.push(a[0]-(a[1]+a[2])),i.push(a[1]),i.push(a[2]);var g=n.a.createRef(),v={labels:t,datasets:[{label:"Distribution of Cases Status",data:i,backgroundColor:["red","orange","green"],borderColor:["red","orange","green"],borderWidth:1}]};return n.a.createElement(W.a,{maxWidth:"sm"},n.a.createElement(Pe.b,{width:30,height:30,data:v,ref:g,options:{tooltips:{enabled:!1,intersect:!1,custom:function(e){if((v=g.current)&&0!==e.opacity){var a=v.chartInstance.canvas.getBoundingClientRect(),t=e.caretX,r=a.top-e.caretY,n=e.labelColors[0].backgroundColor,o=e.body[0].lines[0].split(":")[0],i=parseInt(e.body[0].lines[0].split(":")[1]);!function(e,a,t,r,n,o){b({color:n,top:e,left:a,label:o,percent:t,value:r}),u(!0),setTimeout((function(){return u(!1)}),2e3)}(r,t,100*i/c,i,n,o)}}}}}),n.a.createElement("div",{hidden:!d,className:o.tooltip,style:{top:h.top,left:h.left}},n.a.createElement("p",{className:o.tooltiptext}," ",n.a.createElement("span",{className:o.span,style:{backgroundColor:h.color}}),h.label),n.a.createElement("p",{className:o.tooltiptext}," Percentage : ",parseFloat(h.percent).toFixed(2)," % Cases "),n.a.createElement("p",{className:o.tooltiptext}," Cases : ",h.value)))},Le=function(){var e=He(),a=Object(Z.a)(V,re,{refreshWhenOffline:!0}).data,t=[],r=[];if(a){t=a.cases_time_series.filter((function(e){return X()(e.date,"DD MMM ").isAfter(X()("02-03-2020","DD-MM-YYYY"))}));var o=a.cases_time_series[a.cases_time_series.length-1];r.push(parseInt(o.totalconfirmed)),r.push(parseInt(o.totaldeceased)),r.push(parseInt(o.totalrecovered))}return n.a.createElement(W.a,{maxWidth:"md",className:e.root},n.a.createElement("div",{className:e.toolbar}),n.a.createElement(k.a,{variant:"h4",align:"center"}," Day Wise Statistics "),n.a.createElement("div",{className:e.toolbar}),a?n.a.createElement(We,{data:t,parameter:"dailyconfirmed",label:"Daily Confirmed Cases - India",backgroundColor:"rgba(255,10,10,0.8)",borderColor:"rgb(255,10,10)"}):"",n.a.createElement("div",{className:e.toolbar}),a?n.a.createElement(We,{data:t,parameter:"dailyrecovered",label:"Daily Recovered Cases - India",backgroundColor:"rgba(10,255,10,0.8)",borderColor:"rgb(10,255,10)"}):"",n.a.createElement("div",{className:e.toolbar}),a?n.a.createElement(We,{data:t,parameter:"dailydeceased",label:"Daily Fatal Cases - India",backgroundColor:"rgba(200,10,100,0.8)",borderColor:"rgb(200,10,100)"}):"",n.a.createElement("div",{className:e.toolbar}),a?n.a.createElement(Ye,{data:r,labels:["Active Cases","Fatal Cases","Recovered Cases"]}):"",n.a.createElement("div",{className:e.toolbar}))},ze=[{value:"Home",icon:n.a.createElement(A.a,null),url:"/",component:be},{value:"Statistics",icon:n.a.createElement(I.a,null),url:"/statistics",component:Le},{value:"Zones In India",icon:n.a.createElement(j.a,null),url:"/zones",component:Be},{value:"Updates",icon:n.a.createElement(R.a,null),url:"/updates",component:xe},{value:"Precautions",icon:n.a.createElement(H.a,null),url:"/precautions",component:Te},{value:"Donate",icon:n.a.createElement(B.a,null),url:"/donate",component:we}],Fe=t(52),Ge=Object(N.a)((function(e){return{navStyle:{display:"flex"},listItem:{width:"auto"},listItemIcon:{marginLeft:"1em",color:"white"},listItemText:{borderBottom:"2px solid transparent","&:hover":{borderBottom:"2px solid white"}},navLink:{textDecoration:"none",color:"white",opacity:"0.8"},activeNavLink:{opacity:"1"}}})),_e=function(e){var a=Ge(),t=ze.map((function(e,t){return n.a.createElement(Fe.b,{exact:!0,to:e.url,key:e.url,className:a.navLink,activeClassName:a.activeNavLink},n.a.createElement(g.a,{button:!0,key:e.value,disableGutters:!0,className:a.listItem},n.a.createElement(E.a,{className:a.listItemText},e.value),n.a.createElement(v.a,{className:a.listItemIcon},e.icon)))}));return n.a.createElement(b.a,{component:"ul",className:a.navStyle},t)},Ue=Object(N.a)((function(e){return{root:{display:"flex"},drawer:Object(c.a)({},e.breakpoints.up("sm"),{width:240,flexShrink:0}),appBar:Object(c.a)({},e.breakpoints.up("sm"),{width:"100%",marginLeft:0}),menuButton:Object(c.a)({marginRight:e.spacing(2)},e.breakpoints.up("sm"),{display:"none"}),toolbar:e.mixins.toolbar,drawerPaper:{width:240},content:{flexGrow:1,padding:e.spacing(3)},navbar:{marginLeft:"auto"},navLink:{textDecoration:"none",color:"gray"}}})),Je=function(e){var a=Ue(),t=Object(w.a)(),r=n.a.useState(!1),o=Object(l.a)(r,2),i=o[0],c=o[1],y=function(){c(!i)},N=n.a.createElement("div",null,n.a.createElement(p.a,null),n.a.createElement(b.a,null,ze.map((function(e,t){return n.a.createElement(Fe.b,{to:e.url,key:e.value,className:a.navLink,onClick:y},n.a.createElement(g.a,{button:!0},n.a.createElement(v.a,null,e.icon),n.a.createElement(E.a,{primary:e.value})))}))));return n.a.createElement("div",{className:a.root},n.a.createElement(s.a,null),n.a.createElement(m.a,{position:"static",className:a.appBar,color:"inherit"},n.a.createElement(u.a,null,n.a.createElement(d.a,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:y,className:a.menuButton},n.a.createElement(x.a,null)),n.a.createElement(C.a,{display:{xs:"none",md:"block"}},n.a.createElement(k.a,{variant:"h5",style:{marginLeft:"5vw"}}," CovidAnalytics ")),n.a.createElement(C.a,{display:{xs:"block",md:"none"}},n.a.createElement(k.a,{variant:"h5"}," CovidAnalytics ")),n.a.createElement(C.a,{display:{xs:"none",sm:"block"},className:a.navbar},n.a.createElement(_e,null)))),n.a.createElement(h.a,{smUp:!0,implementation:"css"},n.a.createElement(f.a,{variant:"temporary",anchor:"rtl"===t.direction?"right":"left",open:i,onClose:y,classes:{paper:a.drawerPaper},ModalProps:{keepMounted:!0}},N)))},Ke=t(167),Xe=t.n(Ke),Ze=t(168),qe=t.n(Ze),Ve=Object(N.a)((function(e){return{content:{height:"10vh",backgroundColor:"primary",marginTop:"5vh",textAlign:"center",paddingTop:"2vh"}}})),Qe=function(e){var a=Ve();return n.a.createElement(W.a,{maxWidth:"xl",className:a.content},n.a.createElement(k.a,{variant:"body1"},"Made with ",n.a.createElement(Xe.a,{color:"error"})," and ",n.a.createElement(qe.a,{color:"action"})," while at Home."))},$e=Object(N.a)((function(e){return{root:{border:"1px solidi red",backgroundColor:"orange",color:"white",borderRadius:"5px 3px",fontWeight:"bolder","&:hover":{boxShadow:"1px 1px",transform:"scale(1.01)"}},text:{textDecoration:"none",color:"white"}}})),ea=function(e){var a=$e();return n.a.createElement(W.a,{maxWidth:"sm",style:{marginTop:"2vh"}},n.a.createElement(C.a,{p:4,className:a.root},n.a.createElement(k.a,{variant:"h5"},"Govt Of India Coronavirus Helpline"),n.a.createElement(k.a,{variant:"body1"},"Official Helpline At :",n.a.createElement("a",{href:"tel:+911123978046",className:a.text},"+91-11-23978046")),n.a.createElement(k.a,{variant:"body1"},"Toll Free Helpline At :",n.a.createElement("a",{href:"tel:1075",className:a.text}," 1075")),n.a.createElement(k.a,null,"Email Id Helpline : ",n.a.createElement("a",{href:"mailto:ncov2019@gov.in",className:a.text}," ncov2019@gov.in"))))},aa=t(12);var ta=function(){return n.a.createElement(r.Fragment,null,n.a.createElement(Fe.a,null,n.a.createElement(Je,null),n.a.createElement(W.a,{style:{minHeight:"75vh"}},n.a.createElement(aa.c,null,ze.map((function(e){return n.a.createElement(aa.a,{key:e.url,exact:!0,path:e.url,component:e.component})})))),n.a.createElement(ea,null),n.a.createElement(Qe,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ra=t(367),na=t(169),oa=Object(na.a)({typography:{fontFamily:["Pangolin","Overpass","Roboto","sans-serif"].join(",")},palette:{common:{black:"#000",white:"#fff"},type:"dark",primary:{main:"#90caf9",light:"rgb(166, 212, 250)",dark:"rgb(100, 141, 174)",contrastText:"rgba(0, 0, 0, 0.87)"},secondary:{main:"#a48fb1",light:"rgb(220, 165, 192)",dark:"rgb(170, 100, 123)",contrastText:"rgba(0, 0, 0, 0.87)"},error:{light:"#e57373",main:"#f44336",dark:"#d32f2f",contrastText:"#fff"},warning:{light:"#ffb74d",main:"#ff9800",dark:"#f57c00",contrastText:"rgba(0, 0, 0, 0.87)"},info:{light:"#64b5f6",main:"#2196f3",dark:"#1976d2",contrastText:"#fff"},success:{light:"#81c784",main:"#4caf50",dark:"#388e3c",contrastText:"rgba(0, 0, 0, 0.87)"},grey:{50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#d5d5d5",A200:"#aaaaaa",A400:"#303030",A700:"#616161"},contrastThreshold:3,tonalOffset:.5,text:{primary:"#fff",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",hint:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#424242",default:"#121212",level2:"#333",level1:"#212121"},action:{active:"#fff",hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}}});i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(ra.a,{theme:oa},n.a.createElement(ta,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[179,1,2]]]);
//# sourceMappingURL=main.d53e029f.chunk.js.map