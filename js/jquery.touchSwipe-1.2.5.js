(function($)
{$.fn.swipe=function(options)
{if(!this)return false;var defaults={fingers:1,threshold:75,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,click:null,triggerOnTouchEnd:true,allowPageScroll:"auto"};var LEFT="left";var RIGHT="right";var UP="up";var DOWN="down";var NONE="none";var HORIZONTAL="horizontal";var VERTICAL="vertical";var AUTO="auto";var PHASE_START="start";var PHASE_MOVE="move";var PHASE_END="end";var PHASE_CANCEL="cancel";var hasTouch='ontouchstart'in window,START_EV=hasTouch?'touchstart':'mousedown',MOVE_EV=hasTouch?'touchmove':'mousemove',END_EV=hasTouch?'touchend':'mouseup',CANCEL_EV='touchcancel';var phase="start";if(options.allowPageScroll==undefined&&(options.swipe!=undefined||options.swipeStatus!=undefined))
options.allowPageScroll=NONE;if(options)
$.extend(defaults,options);return this.each(function()
{var that=this;var $this=$(this);var triggerElementID=null;var fingerCount=0;var start={x:0,y:0};var end={x:0,y:0};var delta={x:0,y:0};function touchStart(event)
{var evt=hasTouch?event.touches[0]:event;phase=PHASE_START;if(hasTouch){fingerCount=event.touches.length;}
distance=0;direction=null;if(fingerCount==defaults.fingers||!hasTouch)
{start.x=end.x=evt.pageX;start.y=end.y=evt.pageY;if(defaults.swipeStatus)
triggerHandler(event,phase);}
else
{touchCancel(event);}
that.addEventListener(MOVE_EV,touchMove,false);that.addEventListener(END_EV,touchEnd,false);}
function touchMove(event)
{if(phase==PHASE_END||phase==PHASE_CANCEL)
return;var evt=hasTouch?event.touches[0]:event;end.x=evt.pageX;end.y=evt.pageY;direction=caluculateDirection();if(hasTouch){fingerCount=event.touches.length;}
phase=PHASE_MOVE
validateDefaultEvent(event,direction);if(fingerCount==defaults.fingers||!hasTouch)
{distance=caluculateDistance();if(defaults.swipeStatus)
triggerHandler(event,phase,direction,distance);if(!defaults.triggerOnTouchEnd)
{if(distance>=defaults.threshold)
{phase=PHASE_END;triggerHandler(event,phase);touchCancel(event);}}}
else
{phase=PHASE_CANCEL;triggerHandler(event,phase);touchCancel(event);}}
function touchEnd(event)
{event.preventDefault();distance=caluculateDistance();direction=caluculateDirection();if(defaults.triggerOnTouchEnd)
{phase=PHASE_END;if((fingerCount==defaults.fingers||!hasTouch)&&end.x!=0)
{if(distance>=defaults.threshold)
{triggerHandler(event,phase);touchCancel(event);}
else
{phase=PHASE_CANCEL;triggerHandler(event,phase);touchCancel(event);}}
else
{phase=PHASE_CANCEL;triggerHandler(event,phase);touchCancel(event);}}
else if(phase==PHASE_MOVE)
{phase=PHASE_CANCEL;triggerHandler(event,phase);touchCancel(event);}
that.removeEventListener(MOVE_EV,touchMove,false);that.removeEventListener(END_EV,touchEnd,false);}
function touchCancel(event)
{fingerCount=0;start.x=0;start.y=0;end.x=0;end.y=0;delta.x=0;delta.y=0;}
function triggerHandler(event,phase)
{if(defaults.swipeStatus)
defaults.swipeStatus.call($this,event,phase,direction||null,distance||0);if(phase==PHASE_CANCEL)
{if(defaults.click&&(fingerCount==1||!hasTouch)&&(isNaN(distance)||distance==0))
defaults.click.call($this,event,event.target);}
if(phase==PHASE_END)
{if(defaults.swipe)
{defaults.swipe.call($this,event,direction,distance);}
switch(direction)
{case LEFT:if(defaults.swipeLeft)
defaults.swipeLeft.call($this,event,direction,distance);break;case RIGHT:if(defaults.swipeRight)
defaults.swipeRight.call($this,event,direction,distance);break;case UP:if(defaults.swipeUp)
defaults.swipeUp.call($this,event,direction,distance);break;case DOWN:if(defaults.swipeDown)
defaults.swipeDown.call($this,event,direction,distance);break;}}}
function validateDefaultEvent(event,direction)
{if(defaults.allowPageScroll==NONE)
{event.preventDefault();}
else
{var auto=defaults.allowPageScroll==AUTO;switch(direction)
{case LEFT:if((defaults.swipeLeft&&auto)||(!auto&&defaults.allowPageScroll!=HORIZONTAL))
event.preventDefault();break;case RIGHT:if((defaults.swipeRight&&auto)||(!auto&&defaults.allowPageScroll!=HORIZONTAL))
event.preventDefault();break;case UP:if((defaults.swipeUp&&auto)||(!auto&&defaults.allowPageScroll!=VERTICAL))
event.preventDefault();break;case DOWN:if((defaults.swipeDown&&auto)||(!auto&&defaults.allowPageScroll!=VERTICAL))
event.preventDefault();break;}}}
function caluculateDistance()
{return Math.round(Math.sqrt(Math.pow(end.x-start.x,2)+Math.pow(end.y-start.y,2)));}
function caluculateAngle()
{var X=start.x-end.x;var Y=end.y-start.y;var r=Math.atan2(Y,X);var angle=Math.round(r*180/Math.PI);if(angle<0)
angle=360-Math.abs(angle);return angle;}
function caluculateDirection()
{var angle=caluculateAngle();if((angle<=45)&&(angle>=0))
return LEFT;else if((angle<=360)&&(angle>=315))
return LEFT;else if((angle>=135)&&(angle<=225))
return RIGHT;else if((angle>45)&&(angle<135))
return DOWN;else
return UP;}
try
{this.addEventListener(START_EV,touchStart,false);this.addEventListener(CANCEL_EV,touchCancel);}
catch(e)
{}});};})(jQuery);