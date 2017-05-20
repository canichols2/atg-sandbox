function moveDiv(element, toElement) {
    var newPosition = cumulativeOffset(toElement)
    element.style.top = newPosition.top.toString()
    element.style.left = newPosition.left.toString()
}

var cumulativeOffset = function (element) {
    var top = 0
        , left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);
    return {
        top: top
        , left: left
    };
};