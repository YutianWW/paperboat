window.addEventListener("load", () => {

    let boatButton = document.getElementById("collect-btn");
    boatButton.addEventListener('click', () => {

        // store the date, location, memo 
        let boatInput = document.getElementById("boat-input").value;

        let boatInputObj = { "boat": boatInput };
        boatInputObj.date = document.getElementById("boat-date").value;
        boatInputObj.location = document.getElementById("boat-loc").value;

        let boatInputJSON = JSON.stringify(boatInputObj);
        console.log(boatInputJSON);

        fetch("/boats", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: boatInputJSON
            })
            .then(response => response.json())
            .then(data => {
                console.log("Did this work?");
                console.log(data);
            })
    });
});