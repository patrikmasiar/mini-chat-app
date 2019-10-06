(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{23:function(e,t,a){e.exports={btnsWrapper:"style_btnsWrapper__kO5fY"}},26:function(e,t,a){e.exports=a(81)},31:function(e,t,a){},4:function(e,t,a){e.exports={message:"style_message__ozSTK",mineMessage:"style_mineMessage__2-SOA",author:"style_author__1EyPV",me:"style_me__1Z_j-",createdAt:"style_createdAt__jt8Vx"}},5:function(e,t,a){e.exports={loaderWrapper:"style_loaderWrapper__3q7sh",title:"style_title__1XSp6",sendWrapper:"style_sendWrapper__1VX9N",messageInputWrapper:"style_messageInputWrapper__30Sgk",chatList:"style_chatList__4HRbi"}},81:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(22),s=a.n(r),c=(a(31),a(6)),i=a(7),l=a(10),m=a(8),u=a(11),h=Object(n.createContext)({user:null,room:null,setUser:function(){},setRoom:function(){}}),d=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).setUser=function(e){a.setState({user:e})},a.setRoom=function(e){a.setState({room:e})},a.state={user:null,room:null,setUser:a.setUser,setRoom:a.setRoom},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(h.Provider,{value:this.state},this.props.children)}}]),t}(n.Component),p=h.Consumer,f=a(25),g=a(23),b=a.n(g),v=a(12),C=a.n(v),y=a(2),E=a.n(y),N=a(9),k=a.n(N),w="v1:us1:f0ecceaa-4992-4706-813f-8237028def31",R="support",S="https://masso-mini-chat-app.herokuapp.com",_=a(3),M=function(e){var t=Object(_.a)({},e);return o.a.createElement(o.a.Fragment,null,o.a.createElement("h4",null,t.title),o.a.createElement("div",{className:"form-group",style:{width:350}},o.a.createElement("label",{htmlFor:"nickname"},"Nickname"),o.a.createElement("input",{onChange:t.onNicknameChange,value:t.nickname,type:"text",className:"form-control",id:"nickname",placeholder:"nickname"})),o.a.createElement("div",{className:"form-group",style:{width:350}},o.a.createElement("label",{htmlFor:"chatroom"},"Chat room name"),o.a.createElement("input",{onChange:t.onChatroomChange,value:t.chatroom,type:"text",className:"form-control",id:"chatroom",placeholder:"chat room name"})),o.a.createElement("button",{type:"button",className:"btn btn-success",style:{width:350},onClick:t.onSubmit,disabled:0===t.chatroom.length||0===t.nickname.length},t.buttonLabel),o.a.createElement("button",{type:"button",className:"btn btn-primary",style:{width:200,marginTop:30},onClick:t.onBackClick},"BACK"))},A=a(5),I=a.n(A),O=a(4),j=a.n(O),L=a(24),T=a.n(L),D=a(80),W=function(e){var t=Object(_.a)({},e);return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:t.isMine?j.a.me:null,style:{marginBottom:5}},o.a.createElement("span",{className:j.a.author},t.author,","),o.a.createElement("span",{className:j.a.createdAt},T.a.utc(t.createdAt).local().format("DD.MM.YYYY h:m A"))),o.a.createElement("div",{className:D(j.a.message,t.isMine&&j.a.mineMessage)},t.message))},x=function(e){var t=Object(_.a)({},e),a=Object(n.useRef)(null);if(0===t.title.length)return o.a.createElement("div",{className:I.a.loaderWrapper},o.a.createElement(k.a,{name:"ball-triangle-path",color:"#f0f0f0"}));return o.a.createElement("div",{className:"card text-white bg-dark mt-3"},o.a.createElement("div",{className:"card-header",style:{display:"flex",flex:1,justifyContent:"space-between"}},o.a.createElement("span",{className:I.a.title},t.title),o.a.createElement("button",{className:"btn btn-sm btn-danger",onClick:function(){return confirm("Do you really want to do this?")&&window.location.reload(),!1}},"Leave chat")),o.a.createElement("div",{className:"card-body"},o.a.createElement("div",{className:I.a.chatList},t.messages.map((function(e){var a=e.senderId===t.currentUserId;return o.a.createElement(W,{key:e.id,isMine:a,message:e.text,author:e.senderId,createdAt:e.createdAt})})),o.a.createElement("span",{ref:a}))),o.a.createElement("div",{className:"card-footer"},o.a.createElement("div",{className:I.a.sendWrapper},o.a.createElement("input",{placeholder:"type your message...",className:"form-control",onChange:t.onNewMessageChange,value:t.newMessageValue}),o.a.createElement("button",{type:"button",className:"btn btn-success",style:{marginLeft:10},onClick:function(e){t.onAddSubmit(e),null!==a&&setTimeout((function(){a.current.scrollIntoView({behavior:"smooth"})}),150)},disabled:0===t.newMessageValue.length},"SEND"))))},U=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={chatAction:null,chatRoom:"",userName:"",isLoading:!1,messages:[],isChatReady:!1,message:"",loadedRooms:[],roomId:null},a.handleChangeChatAction=function(e){a.setState({chatAction:e})},a.handleChangeUserName=function(e){a.setState({userName:e.target.value})},a.handleChangeChatRoom=function(e){a.setState({chatRoom:e.target.value})},a.handleUpdateMessage=function(e){a.setState({message:e.target.value})},a.addSupportStaffToRoom=function(){var e=a.props.appData;return e.user.addUserToRoom({userId:R,roomId:e.room.id})},a.connectToRoom=function(e){var t=a.props.appData;return t.user.subscribeToRoom({roomId:"".concat(e),messageLimit:100,hooks:{onMessage:function(e){a.setState({messages:[].concat(Object(f.a)(a.state.messages),[e])})}}}).then((function(e){t.setRoom(e)}))},a.createRoom=function(){a.props.appData.user.createRoom({name:a.state.chatRoom,private:!1}).then((function(e){return a.connectToRoom(e.id)})).then((function(){return a.addSupportStaffToRoom()})).catch(console.error)},a.handleSubmitNewChat=function(){a.setState({isLoading:!0});var e=a.state.userName;null===e||""===e.trim()?alert("Invalid userId"):C.a.post("".concat(S,"/users"),{userId:e}).then((function(){var t=new E.a.TokenProvider({url:"".concat(S,"/authenticate")});return new E.a.ChatManager({instanceLocator:w,userId:e,tokenProvider:t}).connect().then((function(e){a.props.appData.setUser(e),a.setState({isLoading:!1,isChatReady:!0},(function(){return a.createRoom()}))}))})).catch(console.error)},a.handleSubmitJoinChat=function(){a.setState({isLoading:!0});var e=a.state.userName;C.a.post("".concat(S,"/users"),{userId:e}).then((function(){var t=new E.a.TokenProvider({url:"".concat(S,"/authenticate")});return new E.a.ChatManager({instanceLocator:w,userId:e,tokenProvider:t}).connect().then((function(e){a.props.appData.setUser(e),a.setState({isLoading:!1,isChatReady:!0},(function(){var e=a.state.chatRoom.trim(),t=a.state.loadedRooms.find((function(t){return t.name===e}));if("undefined"===typeof t)return alert("Room was not found"),void a.setState({isChatReady:!1});a.connectToRoom(t.id)}))}))})).catch(console.error)},a.handleSubmitMessage=function(e){e.preventDefault();var t=a.state.message,n=a.props.appData;""!==t.trim()&&(n.user.sendMessage({text:t,roomId:"".concat(n.room.id)}),a.setState({message:""}))},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0}),C.a.get("".concat(S,"/posts"),{userId:"support"}).then((function(){var t=new E.a.TokenProvider({url:"".concat(S,"/authenticate")});return new E.a.ChatManager({instanceLocator:w,userId:R,tokenProvider:t}).connect().then((function(t){e.setState({loadedRooms:t.rooms,isLoading:!1})}))})).catch(console.error)}},{key:"render",value:function(){var e=this.state,t=e.chatAction,a=e.isLoading,n=e.chatRoom,r=e.messages,s=e.message,c=e.isChatReady,i=e.userName,l=this.props.appData,m=null;return m=a?o.a.createElement(k.a,{name:"ball-triangle-path",color:"#f0f0f0"}):null===t?o.a.createElement(o.a.Fragment,null,o.a.createElement("button",{type:"button",className:"btn btn-primary",style:{width:200},onClick:this.handleChangeChatAction.bind(this,2)},"Join chat"),o.a.createElement("button",{type:"button",className:"btn btn-info",style:{width:200},onClick:this.handleChangeChatAction.bind(this,1)},"Create new chat")):o.a.createElement(M,{onBackClick:this.handleChangeChatAction.bind(this,null),onChatroomChange:this.handleChangeChatRoom,onNicknameChange:this.handleChangeUserName,chatroom:n,nickname:i,title:1===t?"CREATE NEW CHAT":"\x1cJOIN CHAT ROOM",onSubmit:1===t?this.handleSubmitNewChat:this.handleSubmitJoinChat,buttonLabel:1===t?"\x1cCreate":"Join"}),c?o.a.createElement(x,{title:null!==l.room?l.room.name:"",messages:r,currentUserId:l.user.id,newMessageValue:s,onAddSubmit:this.handleSubmitMessage,onNewMessageChange:this.handleUpdateMessage}):o.a.createElement("div",{className:b.a.btnsWrapper},m)}}]),t}(n.Component),P=function(){return o.a.createElement("div",{className:"container"},o.a.createElement(p,null,(function(e){return o.a.createElement(U,{appData:e})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement((function(){return o.a.createElement(d,null,o.a.createElement(P,null))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[26,1,2]]]);
//# sourceMappingURL=main.d959a623.chunk.js.map