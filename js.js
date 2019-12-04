window.onload = () =>{
    'use strict';
    
    class Timepicker{
        /* rotateElm=function(elm,deg){elm.style[cssTransform]='rotate('+deg+'deg)'}, */
        transform;
        isDragging = false;
        hourHand;
        tpick;
        minutHand;
        backCanv;
        centerX;
        centerY;
        hands = [];
        index = -1;
        
        constructor(hourName, minutName,backCan){
            this.transform = this.getSupportedTransformProp();
            /* this.backCanv = this.getEl(backCan); */
            this.hourHand = this.getEl(hourName);
            this.minutHand = this.getEl(minutName);
            this.tpick = this.getEl('tpick');

            this.hands = [this.hourHand,this.minutHand];

            console.log('%c++','background:orange',this.hourHand);

            this.addListeners(this.tpick,'mousedown',this.onMouseDown.bind(this));
            this.addListeners(this.tpick,'mousemove',this.onMouseMove.bind(this));
            this.addListeners(this.tpick,'mouseup',this.onMouseUp.bind(this));
            // this.addListeners(this.hourHand,'mousedown',this.onMouseDown);
            // this.addListeners(this.hourHand,'mousemove',this.onMouseMove);

            this.centerX = this.tpick.offsetLeft + this.hourHand.offsetLeft+10;
            this.centerY = this.tpick.offsetTop + this.hourHand.offsetTop+70;

            

        }
        rotateElm(elm,deg){
            elm.style[this.transform]=`rotate(${deg}deg)`;
        }
        getEl(id){
            let elem = document.getElementById(id);
            return elem ? elem : document.getElementsByClassName(id)[0];       
        }
        getSupportedTransformProp () {
            let props = ['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform'],
                root = document.documentElement;
            for (let i = 0; i < props.length; i++)
                if (props[i] in root.style) return props[i];
            return null;
        };
        addListeners(elem,event,func){
            elem.addEventListener(event,func);
        }
        checkIn(target){
            return this.hands.indexOf(target);
        }
        onMouseDown(e){
            this.index = this.checkIn(e.target);
            if( this.index  !== -1){
                this.isDragging = true;
                e=e||window.event;
                e.preventDefault();
                e.stopPropagation();
            }
        }
        onMouseMove(e){
            if(this.isDragging){
                e=e||window.event;
                e.preventDefault();
                this.onPtrMove(e.pageX,e.pageY);
            }
        }
        onMouseUp(e){
            this.isDragging = false;
        }
        onPtrMove(x,y){
            let deg, target;
            deg=-Math.atan2(this.centerX-x,this.centerY-y)*180/Math.PI;
            console.log('%c++','background:brown',deg);
            if(deg<0)deg+=360;
            this.rotateElm(this.hands[this.index],deg);
                /* if(isHourHand){
                    if((0<=deg&&deg<90&&270<lastHourDeg&&lastHourDeg<360)||(0<=lastHourDeg&&lastHourDeg<90&&270<deg&&deg<360))isPM=!isPM;
                    lastHourDeg=deg;
                    lastMinuteDeg=deg%30*12;
                    rotateElm(minuteHand,lastMinuteDeg)
                }else{
                    if((270<lastMinuteDeg&&lastMinuteDeg<360&&0<=deg&&deg<90)||(270<deg&&deg<360&&0<=lastMinuteDeg&&lastMinuteDeg<90)){
                        lastHourDeg=lastHourDeg+(deg-lastMinuteDeg-Timepicker.sign(deg-lastMinuteDeg)*360)/12;
                        if(lastHourDeg<0)lastHourDeg+=360;
                        lastHourDeg%=360;
                        if(345<lastHourDeg||lastHourDeg<15)isPM=!isPM
                    }else{
                        lastHourDeg=lastHourDeg+(deg-lastMinuteDeg)/12;
                        if(lastHourDeg<0)lastHourDeg+=360;
                        lastHourDeg%=360
                    }
                    lastMinuteDeg=deg;
                    rotateElm(hourHand,lastHourDeg)
                } */
                /* minute=6*lastHourDeg/180;
                hour=~~minute;
                minute=Math.floor((minute-hour)*60);
                if(isPM)hour+=12;
                updPickedTm(); */
        }
       
    }
    const inst = new Timepicker('hourHand','minutHand','backCan');   
}