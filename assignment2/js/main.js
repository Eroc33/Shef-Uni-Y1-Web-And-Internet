//add callback to make menu mildly more convenient (clicking outside of the dropdown will close it)
document.onclick = function(evt){
    console.dir(evt.target);
    if(evt.target.parentElement.classList.contains('toggle-button')){
        evt.stopPropagation();
    }else{
        var toggles = document.querySelectorAll('.toggle-button-label');
        //nodeList does not have forEach, so use Array::forEach
        [].forEach.call(toggles,function(tgl){tgl.control.checked = false;});
    }
};
function onReady(callback) {
    if (document.readyState === "complete" ||
        ( document.readyState !== "loading" && !document.documentElement.doScroll )) {
        callback();
    } else {
        window.onload = callback;
    }
}
var dyslexiaStyleSheet;

function setDyslexiaMode(enabled){
    if(enabled){
        //do we need to create the element?
        if(!dyslexiaStyleSheet){
            //inject our stylesheet for the dyslexia font
            dyslexiaStyleSheet = document.createElement('link');
            dyslexiaStyleSheet.setAttribute('rel', 'stylesheet');
            dyslexiaStyleSheet.setAttribute('href', 'font/open-dyslexic.css');
        }
        document.head.appendChild(dyslexiaStyleSheet);
    }else{
        if(dyslexiaStyleSheet){
            dyslexiaStyleSheet.remove();
        }
    }
    localStorage.setItem('dyslexicMode',JSON.stringify(enabled));
}

//dyslexia mode, injects a dyslexia friendly font
function injectDyslexiaFont(){
    //if the dyslexia mode is enabled
    var dylexiaModeEnabled = localStorage.key('dyslexicMode') && JSON.parse(localStorage.dyslexicMode) === true;
    setDyslexiaMode(dylexiaModeEnabled);
    enableDyslexiaControls(dylexiaModeEnabled);
}

function enableDyslexiaControls(startValue){
    var checkbox = document.querySelector('#dyslexiaToggle');
    if(checkbox){
        checkbox.checked = startValue;
        checkbox.onchange = function(evt){
            setDyslexiaMode(checkbox.checked);
        }
    }
}

function showScriptOnly(){
    var scriptOnlyStyle = document.createElement("style");
    scriptOnlyStyle.innerHTML = ".script-only{display:initial;}";
    document.querySelector('head').appendChild(scriptOnlyStyle);
}

onReady(function(){
    enableDyslexiaControls();
    injectDyslexiaFont();
    showScriptOnly();
});