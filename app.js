{
    const myTime = setInterval(myTimer, 1000);
    function myTimer() {
        const d = new Date();
        const displayTime = d.toLocaleTimeString();
        document.getElementById('displayTime').innerHTML = displayTime;
    }
}