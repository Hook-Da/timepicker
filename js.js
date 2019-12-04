window.onload = () =>{
    'use strict';
    
    class Timepicker{
        /* rotateElm=function(elm,deg){elm.style[cssTransform]='rotate('+deg+'deg)'}, */
        transform;
        constructor(){
            this.transform = this.getSupportedTransformProp();
        }
        rotateElm(elm,deg){
            elm.style[this.transform]=`rotate(${deg}deg)`;
        }
        getEl(id){
            return document.getElementById(id);
        }
        getSupportedTransformProp () {
            let props = ['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform'],
                root = document.documentElement;
            for (let i = 0; i < props.length; i++)
                if (props[i] in root.style) return props[i];
            return null;
        };
    }
    const inst = new Timepicker;
    const hour = inst.getEl('hourHand');
    
}