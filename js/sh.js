var video ;
var playState = null;
var ele;
var pos ;


document.addEventListener("DOMContentLoaded", function(event) { 
  document.querySelector('.burger-menu').addEventListener('click',function(){
    document.querySelector('.burger-menu-view').style.display="block";
});
 document.querySelector('.burger-close').addEventListener('click',function(){
     document.querySelector('.burger-menu-view').style.display="none";
 });
    textslider();
    Autoplay();
  // touchexpertise();
    document.querySelector('.slide-content').addEventListener('swiped-left', function(e) {
      var index= parseInt($('.slide-dot.active').attr('data-index'));
      var count=$('.slide-dot').length-1;
      if(index>=count)
      {
          index=0;
      }
      else
      {
          index=index+1;
      }
      $('.slide-dot').removeClass('active');
      $('.slide-dot[data-index="'+index+'"]').addClass('active');
      var slideparent=document.querySelector('.slide-data');
      slideparent.style.transform="translateX(-"+index*100+"%)";
    });
    document.querySelector('.slide-content').addEventListener('swiped-right', function(e) {
        var index= parseInt($('.slide-dot.active').attr('data-index'));
        var count=$('.slide-dot').length-1;
        if (index > 0) {
          index = index - 1;
        } else {
            index = count;
        }
        $('.slide-dot').removeClass('active');
        $('.slide-dot[data-index="'+index+'"]').addClass('active');
        var slideparent=document.querySelector('.slide-data');
        slideparent.style.transform="translateX(-"+index*100+"%)";
     });
     var swiper = new Swiper(".swiper", {
      slidesPerView: "auto",
      spaceBetween: 25
    });
   
});

//textslider
function textslider()
{
    
  var items=document.querySelectorAll('.slide-dot');
  items.forEach(element => {
    element.addEventListener("click",function(e){
      e.preventDefault();       
      var index=parseInt(this.getAttribute("data-index"));
      $('.slide-dot').removeClass('active');
      this.classList.add('active');
      var slideparent=document.querySelector('.slide-data');
      slideparent.style.transform="translateX(-"+index*100+"%)";
    });
  });

}
//Autoplay video
function Autoplay()
{
  video=document.querySelector("#video");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          video.pause();       
          playState = false;
        } else {
          video.play();
          playState = true;
        }
      });
    }, {});
    
    observer.observe(video);
    
    const onVisibilityChange = () => {
      if (document.hidden || !playState) {
        video.pause();
      } else {
        video.play();
      }
    };
    
    document.addEventListener("visibilitychange", onVisibilityChange);
}

//Expertise section
function touchexpertise()
{
     
ele = document.querySelector('.expertise-items');
ele.scrollLeft = 0;
pos= { top: 0, left: 0, x: 0, y: 0 };

ele.addEventListener("mousedown",mouseDownHandler);
ele.addEventListener("touchstart",touchDownHandler);
}

const mouseDownHandler = function (e) {
 
  ele.style.cursor = 'grabbing';
  ele.style.userSelect = 'none';
    pos = {
        // The current scroll
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX - pos.x;
  const dy = e.clientY - pos.y;

  // Scroll the element
  ele.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);

  ele.style.cursor = 'grab';
  ele.style.removeProperty('user-select');
};


const touchDownHandler = function (e) {
 
  ele.style.cursor = 'grabbing';
  ele.style.userSelect = 'none';
    pos = {
        // The current scroll
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.touches[0].clientX,
        y:  e.touches[0].clientY,
    };

    document.addEventListener('touchmove',touchMoveHandler);
    document.addEventListener('touchend', touchUpHandler);
};

const touchMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx =  e.touches[0].clientX - pos.x;
  const dy =  e.touches[0].clientY - pos.y;

  // Scroll the element
  ele.scrollLeft = pos.left - dx;
};

const touchUpHandler = function () {
  document.removeEventListener('touchmove', mouseMoveHandler);
  document.removeEventListener('touchend', mouseUpHandler);

  ele.style.cursor = 'grab';
  ele.style.removeProperty('user-select');
};
