window.onload = () =>{
    'use strict';
    
    class Timepicker{
        /* rotateElm=function(elm,deg){elm.style[cssTransform]='rotate('+deg+'deg)'}, */
        transform;
        isDragging = false;
        hourHand;
        tpick;
        minutHand;
        clock;
        centerX;
        centerY;
        hands = [];
        index = -1;
        lastHourDeg = 0;
        lastMinuteDeg = 0;
        
        constructor(hourName, minutName,clock){
            this.transform = this.getSupportedTransformProp();
            this.clock = this.getEl(clock);
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

            this.index = 0;
            this.onPtrMove(20,60);

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
                if(this.hands[this.index] === this.hourHand){
                    //if((0<=deg&&deg<90&&270<this.lastHourDeg&&this.lastHourDeg<360)||(0<=this.lastHourDeg&&this.lastHourDeg<90&&270<deg&&deg<360))isPM=!isPM;
                    this.lastHourDeg=deg;
                    this.lastMinuteDeg=deg%30*12;
                    this.rotateElm(this.minutHand,this.lastMinuteDeg)
                }else{
                    if((270<this.lastMinuteDeg&&this.lastMinuteDeg<360&&0<=deg&&deg<90)||(270<deg&&deg<360&&0<=this.lastMinuteDeg&&this.lastMinuteDeg<90)){
                        this.lastHourDeg=this.lastHourDeg+(deg-this.lastMinuteDeg-this.sign(deg-this.lastMinuteDeg)*360)/12;
                        if(this.lastHourDeg<0)this.lastHourDeg+=360;
                        this.lastHourDeg%=360;
                        //if(345<lastHourDeg||lastHourDeg<15)isPM=!isPM
                    }else{
                        this.lastHourDeg = this.lastHourDeg+(deg-this.lastMinuteDeg)/12;
                        if(this.lastHourDeg<0)this.lastHourDeg+=360;
                        this.lastHourDeg%=360
                    }
                    this.lastMinuteDeg = deg;
                    this.rotateElm(this.hourHand, this.lastHourDeg)
                }
                /* minute=6*lastHourDeg/180;
                hour=~~minute;
                minute=Math.floor((minute-hour)*60);
                if(isPM)hour+=12;
                updPickedTm(); */
        }
        sign(n){
            if(isNaN(n))return NaN;
            if(n==0)return 0;
            if(n<0)return -1;
            return 1
        }
    }
    const inst = new Timepicker('hourHand','minutHand','backCan');   

    const drawer = new Drawer(inst);
}