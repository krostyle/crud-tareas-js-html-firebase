(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{enumerable:!0,get:d})},b.r=function(a){'undefined'!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:'Module'}),Object.defineProperty(a,'__esModule',{value:!0})},b.t=function(a,c){if(1&c&&(a=b(a)),8&c)return a;if(4&c&&'object'==typeof a&&a&&a.__esModule)return a;var d=Object.create(null);if(b.r(d),Object.defineProperty(d,'default',{enumerable:!0,value:a}),2&c&&'string'!=typeof a)for(var e in a)b.d(d,e,function(b){return a[b]}.bind(null,e));return d},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=0)})([function(){const a=firebase.firestore(),b=document.getElementById('task-form'),c=document.getElementById('tareas-container');let d=!1,f='';const g=(b,c)=>a.collection('Tareas').doc().set({title:b,description:c}),h=(b,c)=>a.collection('Tareas').doc(b).update(c),i=(b)=>a.collection('Tareas').doc(b).delete(),j=()=>a.collection('Tareas').get(),e=(b)=>a.collection('Tareas').onSnapshot(b),k=(b)=>a.collection('Tareas').doc(b).get();window.addEventListener('DOMContentLoaded',async()=>{await k();e((a)=>{c.innerHTML='',a.forEach((a)=>{console.log(a.data());const e=a.data();e.id=a.id,c.innerHTML+=`
            <div class="card card-body mt-2 border-primary">
                <h5>${e.title}</h5>
                <p>${e.description}</p>
                <div>
                    <button class="btn btn-primary mt-2 btn-edit" data-id="${e.id}">Editar</button>
                    <button class="btn btn-danger mt-2 btn-delete" data-id="${e.id}">Eliminar</button>
                </div>
            </div>`;const g=document.querySelectorAll('.btn-delete');g.forEach((a)=>{a.addEventListener('click',async(a)=>{await i(a.target.dataset.id)})});const h=document.querySelectorAll('.btn-edit');h.forEach((a)=>{a.addEventListener('click',async(a)=>{const c=await k(a.target.dataset.id),e=c.data();d=!0,f=c.id,b['task-title'].value=e.title,b['task-description'].value=e.description,b['btn-task-form'].innerText='Actualizar'})})})})}),b.addEventListener('submit',async(a)=>{a.preventDefault();const c=b['task-title'],e=b['task-description'];d?(await h(f,{title:c.value,description:e.value}),d=!1,b['btn-task-form'].innerText='Guardar'):await g(c.value,e.value),j(),b.reset(),c.focus()})}]);