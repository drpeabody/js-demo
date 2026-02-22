
class DrawUtil {

    color_axes = "#fff";

    static drawAxes(ctx) {

		ctx.strokeStyle = color_fg;
		ctx.beginPath();
		ctx.moveTo(Tx(0), Ty(0));
		ctx.lineTo(Tx(1), Ty(0));
		ctx.moveTo(Tx(0), Ty(0));
		ctx.lineTo(Tx(0), Ty(1));
		ctx.closePath();
		ctx.stroke();

    }
}