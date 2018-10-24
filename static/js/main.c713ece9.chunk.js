(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,a){e.exports=a(45)},22:function(e,t,a){},43:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(11),o=a.n(r),i=(a(22),a(12)),c=a(13),l=a(15),m=a(14),u=a(16),d=a(2),h=a(4),p=a.n(h),f=(a(43),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={isLoading:!0,error:null,id:1,name:"",username:"",email:"",address:[],userComments:[]},a.handleInputChange=a.handleInputChange.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.sendAxiosRequest()}},{key:"sendAxiosRequest",value:function(){var e=this,t="https://jsonplaceholder.typicode.com/users/".concat(this.state.id),a="https://jsonplaceholder.typicode.com/posts?userId=".concat(this.state.id);p.a.get(t).then(function(t){e.handleAxiosRequest(t,"user")}).catch(function(t){e.setState({isLoading:!1,error:{message:"error in user async request: ".concat(t)}}),e.resetData(),console.error("error in user async request: ",t)}),p.a.get(a).then(function(t){e.handleAxiosRequest(t,"comments")}).catch(function(t){e.setState({isLoading:!1,error:{message:"error in comments async request: ".concat(t)}}),e.resetData(),console.error("error in comments async request: ",t)})}},{key:"resetData",value:function(){this.setState({name:"",username:"",email:"",address:[],userComments:[]})}},{key:"handleAxiosRequest",value:function(e,t){if(t&&e)if("undefined"!==e&&"object"===typeof e&&e.data)switch(t){case"user":this.setState({name:e.data.name,username:e.data.username,email:e.data.email,address:e.data.adress,error:null,isLoading:!1});break;case"comments":this.setState({userComments:e.data,isLoading:!1,error:null});break;default:this.setState({isLoading:!1,error:{message:"type is not correctly set, please provide a valid type"}}),console.error("type is not correctly set, please provide a valid type")}else this.setState({error:{isLoading:!1,message:"Async Response is invalid, please check..."}}),console.error("Async Response is invalid, please check...")}},{key:"handleInputChange",value:function(e){var t=this;this.setState({id:e.target.value}),setTimeout(function(){t.sendAxiosRequest()},100)}},{key:"render",value:function(){var e=this.state,t=e.isLoading,a=e.error,n=this.state.name,r=this.state.userComments;return s.a.createElement("div",{className:"App"},s.a.createElement("h1",null,"Fetch asynchronous data from an API (2h)"),s.a.createElement("p",null,"Type in a random number, this user with the given number is fetched"),s.a.createElement("input",{type:"number",name:"id",className:"input",value:this.state.id,onChange:this.handleInputChange}),a?s.a.createElement("p",{className:"error"},a.message):null,s.a.createElement("div",{className:"container"},s.a.createElement("h2",null,"User Data"),t||""===n?s.a.createElement("p",{className:"error"},"Keinen Benutzer mit der ID ",this.state.id," gefunden"):s.a.createElement("div",{className:"user"},s.a.createElement("p",{className:"user__text"},s.a.createElement("span",null,this.state.name)),s.a.createElement("p",{className:"user__text"},s.a.createElement("span",null,this.state.username)),s.a.createElement("p",{className:"user__text"},s.a.createElement("span",null,this.state.email))),s.a.createElement("h2",null,"Comments (first five)"),!t&&r.length>0?r.slice(0,5).map(function(e){var t=e.id,a=e.title,n=e.body;return s.a.createElement("blockquote",{className:"comment",key:t},s.a.createElement("p",{className:"comment__title"},a),s.a.createElement("p",{className:"comment__body"},n))}):s.a.createElement("p",{className:"error"},"Keine Kommentare mit der ID ",this.state.id," gefunden")))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,2,1]]]);
//# sourceMappingURL=main.c713ece9.chunk.js.map