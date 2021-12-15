adensity = parseInt($('#adensity').val());
asize = parseInt($('#asize').val());
bdensity = parseInt($('#bdensity').val());
bsize = parseInt($('#bsize').val());

$('#adensity').on('change', function() {
	elementos[0].density = parseInt($('#adensity').val());
});
$('#asize').on('change', function() {
	elementos[0].rad = parseInt($('#asize').val());
});
$('#bdensity').on('change', function() {
	elementos[1].density = parseInt($('#bdensity').val());
});
$('#bsize').on('change', function() {
	elementos[1].rad = parseInt($('#bsize').val());
});

$('.reset').on('click', function(){
	adensity = parseInt($('#adensity').val());
	asize = parseInt($('#asize').val());
	bdensity = parseInt($('#bdensity').val());
	bsize = parseInt($('#bsize').val());
  ctx.clearRect(0,0,canvas.width,canvas.height);
  elementos = [];
  objectA();
  objectB();
});


var canvas = document.querySelector('.canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);
var ctx = canvas.getContext('2d');

window.addEventListener("resize", function() {
	adensity = parseInt($('#adensity').val());
	asize = parseInt($('#asize').val());
	bdensity = parseInt($('#bdensity').val());
	bsize = parseInt($('#bsize').val());
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  elementos = [];
  objectA();
  objectB();
});

elementos = [];
lsd = [
  '#424242',
  '#FF6D37',
];


function Blob() {
	this.a;
  this.x = a;
  this.y = b;
  this.dx;
  this.dy;
  this.rad = rad;
  this.clr = lsd[clr];
	this.density = density;
	this.weight = (4*Math.PI/3*Math.pow(this.rad / 200, 3)) * this.density;
  var t ={
      xs : this.xs,
      ys : this.ys
  }
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.rad,0,2*Math.PI);
    ctx.fillStyle = (this.clr);
    ctx.fill()
  }
	this.update = function() {
		this.weight = (4*Math.PI/3*Math.pow(this.rad / 200, 3)) * this.density;
		this.a = force / this.weight;
		this.x = this.x + (Math.cos(angle)* (this.a*this.dx));
		this.y = this.y + (Math.sin(angle)* (this.a*this.dy));
		this.draw();
  }
}
function objectA() {
  rad = parseInt(asize);
	density = adensity;
  a = rad + Math.random() * (canvas.width - 2*rad);
  b = rad + Math.random() * (canvas.height - 2*rad);
  clr = Math.floor(Math.random()*lsd.length);
  elementos.push(new Blob());
}
function objectB() {
  rad = parseInt(bsize);
	density = bdensity;
	a = rad + Math.random() * (canvas.width - 2*rad);
  b = rad + Math.random() * (canvas.height - 2*rad);
  clr = Math.floor(Math.random()*lsd.length);
  elementos.push(new Blob());
}
objectA();
objectB();
otherelem = {
	0 : 1,
	1 : 0
};
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

	deltax = elementos[0].x - elementos[1].x;
	if (deltax < 0) {
		deltax = deltax *-1;
	}
	deltay = elementos[0].y - elementos[1].y;
	if (deltay < 0) {
		deltay = deltay *-1;
	}
	hyp = Math.sqrt(Math.pow(deltax, 2) + Math.pow(deltay, 2));
	angle = Math.atan2(deltay,deltax);
	force = (elementos[0].weight*elementos[1].weight)/deltax;
	if (hyp >= elementos[0].rad + elementos[1].rad) {
		for (var i = 0; i < elementos.length; i++) {
			if (elementos[i].x > elementos[otherelem[i]].x) {
				elementos[i].dx = -1;
			} else {
				elementos[i].dx = 1;
			}
			if (elementos[i].y > elementos[otherelem[i]].y) {
				elementos[i].dy = -1;
			} else {
				elementos[i].dy = 1;
			}
			elementos[i].update();
		}
	} else {
		for (var i = 0; i < elementos.length; i++) {
			elementos[i].draw();
		}
	}
}
animate();
