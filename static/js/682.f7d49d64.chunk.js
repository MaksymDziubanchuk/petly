"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[682],{682:function(e,r,a){a.d(r,{Z:function(){return k}});var o=a(9439),s={button__primary_not_main:"auth-form_button__primary_not_main__8P-fg",button__primary_main:"auth-form_button__primary_main__MnTkE",button__secondary:"auth-form_button__secondary__KPh8C",button__secondary_active:"auth-form_button__secondary_active__NYsjk",button__learn:"auth-form_button__learn__aF1Az",form__input_container:"auth-form_form__input_container__aA0wO",form__label:"auth-form_form__label__kvu1f",form__input:"auth-form_form__input__PCyqB",form__input_phone:"auth-form_form__input_phone__3+Prq",form__input_number:"auth-form_form__input_number__ad5x5",form__input__password_show:"auth-form_form__input__password_show__m0iHa",error__mesage:"auth-form_error__mesage__60rvQ",form__login__input:"auth-form_form__login__input__goTNO",coordination__box:"auth-form_coordination__box__IaRI-",coordination__box_input:"auth-form_coordination__box_input__45QT5",coordination__box_title:"auth-form_coordination__box_title__Ub9P3",coordination__box_link:"auth-form_coordination__box_link__4TUNL",form__button:"auth-form_form__button__-DMkC",form__back_button:"auth-form_form__back_button__g2+wq",form__description:"auth-form_form__description__SN4bk",form__description_reset:"auth-form_form__description_reset__eFgSI",form__description_recover:"auth-form_form__description_recover__H2YZU",description__nav:"auth-form_description__nav__UAxeo",loading__modal:"auth-form_loading__modal__j9v7f"},n=a(9434),t=a(4632),i=a(3220),_="google-nav_googleBox__pLbWW",c="google-nav_googleBox__title__fq7Z0",m="google-nav_linkBox__Z0cDd",l="google-nav_googleDecs__GGIZo",d="google-nav_googleLink__A-F5w",u=a(2600),p=a(9230),h=a(3329),f="https://backend-team-project-pet-support.onrender.com",x=function(){var e=(0,n.v9)((function(e){return e.menu.menuActive})),r=(0,n.I0)(),a=(0,p.$G)().t;return(0,h.jsxs)("div",{className:_,children:[(0,h.jsx)("div",{className:c,children:(0,h.jsx)("p",{className:l,children:a("AuthForm.google")})}),(0,h.jsx)("div",{className:m,children:!0===e?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("a",{href:"".concat(f,"/api/auth/google"),className:d,onClick:function(){return r((0,u.M)(!e))},children:(0,h.jsx)(i.Z,{id:"icon-google"})}),(0,h.jsx)("a",{href:"".concat(f,"/api/auth/facebook"),className:d,onClick:function(){return r((0,u.M)(!e))},children:(0,h.jsx)(i.Z,{id:"facebook"})})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("a",{href:"".concat(f,"/api/auth/google"),className:d,children:(0,h.jsx)(i.Z,{id:"icon-google"})}),(0,h.jsx)("a",{href:"".concat(f,"/api/auth/facebook"),className:d,onClick:function(){return r((0,u.M)(!e))},children:(0,h.jsx)(i.Z,{id:"facebook"})})]})})]})},j=a(5705),g=a(6107),b=a(2797),N=a(2791),w=a(5264),y=a(1087),v=a(7689),F=a(9773),k=function(){var e=(0,N.useState)(!0),r=(0,o.Z)(e,2),a=r[0],_=r[1],c=(0,N.useState)(!1),m=(0,o.Z)(c,2),l=m[0],d=m[1],u=(0,N.useState)(!1),f=(0,o.Z)(u,2),k=f[0],Z=f[1],A=(0,N.useState)(!1),C=(0,o.Z)(A,2),S=C[0],P=C[1],L=(0,N.useState)(""),B=(0,o.Z)(L,2),O=B[0],T=B[1],V=(0,N.useState)(""),R=(0,o.Z)(V,2),q=R[0],z=R[1],I=(0,N.useState)(""),M=(0,o.Z)(I,2),U=M[0],J=M[1],D=(0,v.TH)().pathname,G=(0,v.UO)().token,H=(0,v.s0)(),$=(0,p.$G)().t;(0,N.useEffect)((function(){"/register"!==D&&"/login"!==D&&"/verify"!==D&&"/reset-password"!==D&&J(G)}),[D,G]);var E=function(e){switch(e.target.name){case"password":T(e.target.value);break;case"passwordConfirm":z(e.target.value);break;case"coordination":P(e.target.checked);break;default:return}},Q=(0,n.v9)((function(e){return e.auth.loading})),W=(0,n.I0)(),Y={email:"",password:"",passwordConfirm:"",name:"",region:"",number:""},K=b.Ry().shape({email:b.Z_().email().min(10,$("AuthForm.error.passwordMin")).max(63,$("AuthForm.error.passwordMax")),password:b.Z_().required().min(7).max(32),passwordConfirm:b.Z_().required()});function X(e){var r;return e?e.includes(" ")&&(r=$("AuthForm.error.spaces")):r=$("AuthForm.error.passwordFalse"),r}function ee(e){var r;return e?/^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/i.test(e)||(r=$("AuthForm.error.emailSymbol")):r=$("AuthForm.error.emailFalse"),r}var re=b.Ry().shape({name:b.Z_().required($("AuthForm.error.name")),region:b.Z_().required($("AuthForm.error.region")),number:b.Z_().matches(/[0-9]/,$("AuthForm.error.numberFormat")).required($("AuthForm.error.numberFalse")).min(9,$("AuthForm.error.numberMin")).max(9,$("AuthForm.error.numberMax"))}),ae=b.Ry().shape({email:b.Z_().email().required().min(10).max(63),password:b.Z_().required().min(7).max(32)}),oe=function(e,r){if(a)return e.password!==e.passwordConfirm?w.Notify.failure($("AuthForm.error.passwordsSameValue"),{timeout:6e3,distance:"100px",opacity:"0.8",useIcon:!1,fontSize:"18px",borderRadius:"20px",showOnlyTheLastOne:!0}):_(!1);if(!a){if(!F.find((function(r){return"".concat(r.city,", ").concat(r.admin_name)===e.region})))return w.Notify.failure($("AuthForm.error.regionList"),{timeout:6e3,distance:"100px",opacity:"0.8",useIcon:!1,fontSize:"18px",borderRadius:"20px",showOnlyTheLastOne:!0});var o={email:e.email,password:e.password,name:e.name,city:e.region,phone:"380".concat(e.number)};return r.resetForm(),_(!0),W(t.ZP.registerNewUser(o))}},se=function(){return d(!l)},ne=function(){return Z(!k)};return(0,h.jsxs)(h.Fragment,{children:[Q&&(0,h.jsx)(g.Z,{}),"/register"===D&&(0,h.jsxs)(h.Fragment,{children:[a?(0,h.jsx)(j.J9,{validationSchema:K,initialValues:Y,onSubmit:oe,children:(0,h.jsxs)(j.l0,{className:s.form__container,autoComplete:"off",onChange:E,children:[(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:s.form__input,type:"email",name:"email",validate:ee,placeholder:" "}),(0,h.jsx)("label",{className:s.form__label,children:$("AuthForm.stepOne.email")}),(0,h.jsx)(j.Bc,{name:"email",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:s.form__input,type:l?"text":"password",name:"password",validate:X,placeholder:" "}),(0,h.jsx)("label",{className:s.form__label,children:$("AuthForm.stepOne.password")}),O.length>=1&&(0,h.jsx)("span",{className:s.form__input__password_show,onClick:se,children:l?(0,h.jsx)(i.Z,{id:"eye-blocked"}):(0,h.jsx)(i.Z,{id:"eye"})}),(0,h.jsx)(j.Bc,{name:"password",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:s.form__input,type:k?"text":"password",name:"passwordConfirm",placeholder:" ",validate:X}),(0,h.jsx)("label",{className:s.form__label,children:$("AuthForm.stepOne.passwordTwo")}),q.length>=1&&(0,h.jsx)("span",{className:s.form__input__password_show,onClick:ne,children:k?(0,h.jsx)(i.Z,{id:"eye-blocked"}):(0,h.jsx)(i.Z,{id:"eye"})}),(0,h.jsx)(j.Bc,{name:"passwordConfirm",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsxs)("div",{className:s.coordination__box,children:[(0,h.jsx)(j.gN,{className:s.coordination__box_input,type:"checkbox",name:"coordination",id:"coordination"}),(0,h.jsxs)("label",{className:s.coordination__box_title,htmlFor:"coordination",children:[$("AuthForm.stepOne.confirm")," ",(0,h.jsx)("a",{href:"https://www.google.com.ua/",className:s.coordination__box_link,target:"_blank",rel:"noopener noreferrer",children:$("AuthForm.stepOne.confirmLink")})]})]}),(0,h.jsx)("button",{className:"".concat(s.button__primary_main," ").concat(s.form__button),type:"submit",disabled:!S,children:$("AuthForm.stepOne.btnNext")}),(0,h.jsx)(x,{})]})}):(0,h.jsx)(j.J9,{validationSchema:re,initialValues:Y,onSubmit:oe,autoComplete:"off",children:(0,h.jsxs)(j.l0,{className:s.form__container,children:[(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:s.form__input,type:"text",name:"name",placeholder:" ",required:!0}),(0,h.jsx)("label",{className:s.form__label,children:$("AuthForm.stepTwo.name")}),(0,h.jsx)(j.Bc,{name:"name",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:s.form__input,name:"region",list:"region",type:"text",placeholder:" "}),(0,h.jsx)("datalist",{id:"region",children:F.map((function(e){return(0,h.jsxs)("option",{children:[e.city,", ",e.admin_name]},"".concat(e.city,".").concat(e.lat))}))}),(0,h.jsx)("label",{className:s.form__label,children:$("AuthForm.stepTwo.cityRegion")}),(0,h.jsx)(j.Bc,{name:"region",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:"".concat(s.form__input," ").concat(s.form__input_phone),type:"tel",name:"number",placeholder:" "}),(0,h.jsxs)("span",{className:s.form__input_number,children:[(0,h.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"25",height:"20",children:[(0,h.jsx)("rect",{width:"25",height:"10",fill:"#005BBB"}),(0,h.jsx)("rect",{width:"25",height:"10",y:"10",fill:"#FFD500"})]}),(0,h.jsx)("p",{children:"+380"})]}),(0,h.jsx)("label",{className:s.form__label,children:$("AuthForm.stepTwo.phone")}),(0,h.jsx)(j.Bc,{name:"number",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsxs)("span",{className:"".concat(s.button__primary_not_main," ").concat(s.form__back_button),onClick:function(){if(!a)return _(!0)},children:["\u140a ",$("AuthForm.stepTwo.btnBack")]}),(0,h.jsx)("button",{className:"".concat(s.button__primary_main," ").concat(s.form__button),type:"submit",children:$("AuthForm.stepTwo.btnRegister")}),(0,h.jsx)(x,{})]})}),(0,h.jsxs)("p",{className:s.form__description,children:[$("AuthForm.haveAccount")," ",(0,h.jsx)(y.OL,{className:s.description__nav,to:"/login",children:$("AuthForm.login")})]})]}),"/login"===D&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(j.J9,{validationSchema:ae,initialValues:Y,onSubmit:function(e,r){var a,o={email:e.email,password:e.password};return r.resetForm(),a=o,void W(t.ZP.login(a))},children:(0,h.jsxs)(j.l0,{className:s.form__container,autoComplete:"off",onChange:E,children:[(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:s.form__input,type:"email",name:"email",placeholder:" "}),(0,h.jsx)("label",{className:s.form__label,children:$("LoginForm.email")}),(0,h.jsx)(j.Bc,{name:"email",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:"".concat(s.form__input," ").concat(s.form__login__input),type:l?"text":"password",name:"password",placeholder:" ",validate:X}),(0,h.jsx)("label",{className:s.form__label,children:$("LoginForm.password")}),O.length>=1&&(0,h.jsx)("span",{className:s.form__input__password_show,onClick:se,children:l?(0,h.jsx)(i.Z,{id:"eye-blocked"}):(0,h.jsx)(i.Z,{id:"eye"})}),(0,h.jsx)(j.Bc,{name:"password",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsx)("button",{className:"".concat(s.button__primary_main," ").concat(s.form__button),type:"submit",children:$("LoginForm.btnLogin")}),(0,h.jsxs)("p",{className:s.form__description,children:[$("LoginForm.resendVerification")," ",(0,h.jsx)(y.OL,{to:"/verify",className:s.description__nav,children:$("LoginForm.here")})]}),(0,h.jsxs)("p",{className:"".concat(s.form__description," ").concat(s.form__description_reset),children:[$("LoginForm.forgotPassword")," ",(0,h.jsx)(y.OL,{to:"/reset-password",className:s.description__nav,children:$("LoginForm.here")})]}),(0,h.jsx)(x,{})]})}),(0,h.jsxs)("p",{className:s.form__description,children:[$("LoginForm.notAccount")," ",(0,h.jsx)(y.OL,{to:"/register",className:s.description__nav,children:$("LoginForm.register")})]})]}),"/verify"===D&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(j.J9,{validationSchema:ae,initialValues:Y,onSubmit:function(e,r){var a={email:e.email,password:e.password};return r.resetForm(),W(t.ZP.authVerify(a))},children:(0,h.jsxs)(j.l0,{className:s.form__container,autoComplete:"off",onChange:E,children:[(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:s.form__input,type:"email",name:"email",placeholder:" "}),(0,h.jsx)("label",{className:s.form__label,children:$("VerifyForm.email")}),(0,h.jsx)(j.Bc,{name:"email",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:"".concat(s.form__input," ").concat(s.form__login__input),type:"password",name:"password",placeholder:" ",validate:X}),(0,h.jsx)("label",{className:s.form__label,children:$("VerifyForm.password")}),O.length>=1&&(0,h.jsx)("span",{className:s.form__input__password_show,onClick:se,children:l?(0,h.jsx)(i.Z,{id:"eye-blocked"}):(0,h.jsx)(i.Z,{id:"eye"})}),(0,h.jsx)(j.Bc,{name:"password",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsx)("button",{className:"".concat(s.button__primary_main," ").concat(s.form__button),type:"submit",children:$("VerifyForm.verify")})]})}),(0,h.jsxs)("p",{className:s.form__description,children:[$("VerifyForm.back")," ",(0,h.jsx)(y.OL,{to:"/login",className:s.description__nav,children:$("VerifyForm.login")})]})]}),"/reset-password"===D&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(j.J9,{initialValues:Y,onSubmit:function(e,r){var a={email:e.email};return r.resetForm(),W(t.ZP.resetUserPassword(a))},children:(0,h.jsxs)(j.l0,{className:s.form__container,children:[(0,h.jsx)("p",{className:s.form__description_recover,children:$("ResetPasswordForm.title")}),(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:s.form__input,type:"email",name:"email",placeholder:" ",validate:ee}),(0,h.jsx)("label",{className:s.form__label,children:$("ResetPasswordForm.email")}),(0,h.jsx)(j.Bc,{name:"email",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsx)("button",{className:"".concat(s.button__primary_main," ").concat(s.form__button),type:"submit",children:$("ResetPasswordForm.resetPassword")})]})}),(0,h.jsxs)("p",{className:s.form__description,children:[$("ResetPasswordForm.back")," ",(0,h.jsx)(y.OL,{to:"/login",className:s.description__nav,children:$("ResetPasswordForm.login")})]})]}),"/register"!==D&&"/login"!==D&&"/verify"!==D&&"/reset-password"!==D&&(0,h.jsx)(j.J9,{validationSchema:K,initialValues:Y,onSubmit:function(e,r){if(e.password!==e.passwordConfirm)return w.Notify.failure($("AuthForm.error.passwordsSameValue"),{timeout:6e3,distance:"100px",opacity:"0.8",useIcon:!1,fontSize:"18px",borderRadius:"20px",showOnlyTheLastOne:!0});var a={userToken:U,userNewPassword:{password:e.password}};return r.resetForm(),T(""),z(""),J(""),W(t.ZP.refreshPassword(a)),H("/login")},children:(0,h.jsxs)(j.l0,{className:s.form__container,autoComplete:"off",onChange:E,children:[(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:s.form__input,type:l?"text":"password",name:"password",validate:X,placeholder:" "}),(0,h.jsx)("label",{className:s.form__label,children:$("changePasswordForm.password")}),O.length>=1&&(0,h.jsx)("span",{className:s.form__input__password_show,onClick:se,children:l?(0,h.jsx)(i.Z,{id:"eye-blocked"}):(0,h.jsx)(i.Z,{id:"eye"})}),(0,h.jsx)(j.Bc,{name:"password",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsxs)("div",{className:s.form__input_container,children:[(0,h.jsx)(j.gN,{className:s.form__input,type:k?"text":"password",name:"passwordConfirm",placeholder:" ",validate:X}),(0,h.jsx)("label",{className:s.form__label,children:$("changePasswordForm.confirmPassword")}),q.length>=1&&(0,h.jsx)("span",{className:s.form__input__password_show,onClick:ne,children:k?(0,h.jsx)(i.Z,{id:"eye-blocked"}):(0,h.jsx)(i.Z,{id:"eye"})}),(0,h.jsx)(j.Bc,{name:"passwordConfirm",render:function(e){return(0,h.jsx)("p",{className:s.error__mesage,children:e})}})]}),(0,h.jsx)("button",{className:"".concat(s.button__primary_main," ").concat(s.form__button),type:"submit",children:$("changePasswordForm.changePassword")})]})})]})}}}]);
//# sourceMappingURL=682.f7d49d64.chunk.js.map