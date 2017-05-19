function MoveDiv(element, toElement){
    var newPosition = cumulativeOffset(toElement)
    element.style.top=newPosition.top.toString()
    element.style.left=newPosition.left.toString()
}

    function animateThis(element){
        element.style.transition="all 1s ease-in-out";
        
        var player=document.querySelector(".active");
        console.log(player)
        var playeroffset=cumulativeOffset(player);
        
        var offset = cumulativeOffset(element)
        var x = playeroffset.left - offset.left
        var y = playeroffset.top - offset.top
        
        element.style.position="absolute";
        console.log(offset)
        console.log(cumulativeOffset(element))
        setTimeout(function(){
            element.style.transform+=" translate("+x+"px,"+y+"px)";
            console.log(cumulativeOffset(element))
        },1000)
        
    }
    function moveToPlayer(element){
        
        
    }
    


    var cumulativeOffset = function(element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop  || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);

        return {
            top: top,
            left: left
        };
    };