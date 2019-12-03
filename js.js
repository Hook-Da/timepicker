'use strict';
class Timepicker{
    /* rotateElm=function(elm,deg){elm.style[cssTransform]='rotate('+deg+'deg)'}, */
    rotateElm(elm,deg){
        elm.style[cssTransform]=`rotate(${deg}deg)`;
    }
    getEl(id){
        return document.getElementById(id);
    }
}
const inst = new Timepicker;
const hour = inst.getEl('hourHand');
console.log('%c++','background:lime',inst.getEl('hourHand').style);
let x = 1;
/* setInterval(()=>{
    x++;
    inst.rotateElm(x);
},1000) */