document.addEventListener("DOMContentLoaded", function() {
  // code...

  var mousePos = { x: -1, y: -1 };
  var preMousePos = { x: -1, y: -1 };
  var mouseSpeed = { x: 0, y: 0 };
  var cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', function (e) {
    // preMousePos.x = mousePos.x;
    // preMousePos.y = mousePos.y;
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    // mouseSpeed.y = ((preMousePos.x - mousePos.x) / (preMousePos.y - mousePos.y)) / 10;
    // mouseSpeed.x = ((preMousePos.y - mousePos.y) / (preMousePos.x - mousePos.x)) / 10;
    //cursor.style.transform = 'matrix(1, 0, 0, 1, '+mousePos.x+', '+mousePos.y+')';
    cursor.style.transform = 'matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,'+mousePos.x+','+mousePos.y+',0,1)';
  }, false);

  document.addEventListener('mouseenter', function (e) {
    cursor.classList.remove('hidden');
  }, false);

  document.addEventListener('mouseleave', function (e) {
    cursor.classList.add('hidden');
  }, false);




  window.addEventListener('touchstart', function () {
    cursor.classList.add('touch');
  }, false);
});
