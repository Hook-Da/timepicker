class Drawer{
    hourHand;
    minutHand;
    clock;
    timepicker;
    constructor(timepicker){
        this.timepicker = timepicker;
        this.hourHand = timepicker.hourHand;
        this.minutHand = timepicker.minutHand;
        this.clock = timepicker.clock;

        this.draw();
    }
    draw(){
        let ctx = this.clock.getContext('2d');
		ctx.strokeStyle= '#000';
		ctx.beginPath();
		ctx.arc(120,120,119,0,2*Math.PI);
		ctx.stroke();
		let radGrd=ctx.createRadialGradient(120,120,1,120,120,120);
		radGrd.addColorStop(0,'#666');
		radGrd.addColorStop(1,'#000');
		ctx.fillStyle=radGrd;
		ctx.beginPath();
		ctx.arc(120,120,118,0,2*Math.PI);
		ctx.fill();
		ctx.translate(120,120);
		ctx.fillStyle='#fff';
		for(let i=0;i<12;i++){
			ctx.beginPath();
			ctx.arc(0,-110,2,0,2*Math.PI);
			ctx.fill();
			ctx.rotate(Math.PI/30);
			for(let j=0;j<4;j++){
				ctx.beginPath();
				ctx.arc(0,-110,1,0,2*Math.PI);
				ctx.fill();
				ctx.rotate(Math.PI/30);
			}
		}
		ctx.font='18px Verdana';
		ctx.textAlign='center';
		ctx.textBaseline='middle';
		for(let i=1;i <= 12;i++){
			ctx.fillText(i,94*Math.sin(i*Math.PI/6),-94*Math.cos(i*Math.PI/6));
		}
		ctx.translate(-120,-120);
		// Create hour hand
		ctx = this.hourHand.getContext('2d');
		ctx.fillStyle='#0af';
		ctx.beginPath();
		ctx.moveTo(10,0);
		ctx.lineTo(0,90);
		ctx.lineTo(20,90);
		ctx.lineTo(10,0);
		ctx.fill();
		// Create minute hand
		ctx = this.minutHand.getContext('2d');
		ctx.fillStyle='#ff0';
		ctx.beginPath();
		ctx.moveTo(6,0);
		ctx.lineTo(0,110);
		ctx.lineTo(12,110);
		ctx.lineTo(6,0);
		ctx.fill();
		ctx.fillStyle='#000';
		ctx.beginPath();
		ctx.arc(6,90,2,0,2*Math.PI);
		ctx.fill();
		// Create second hand
		/* ctx=secondHand.getContext('2d');
		ctx.fillStyle='#f44336';
		ctx.beginPath();
		ctx.moveTo(4,0);
		ctx.lineTo(0,120);
		ctx.lineTo(8,120);
		ctx.lineTo(4,0);
		ctx.fill();
		ctx.fillStyle='#000';
		ctx.beginPath();
		ctx.arc(4,90,2,0,2*Math.PI);
		ctx.fill() */
    }
}