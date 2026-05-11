const donorForm = document.querySelector("form");

donorForm.addEventListener("submit", async(e) => {

    e.preventDefault();

    const donorData = {

        name: document.getElementById("name").value,

        phone: document.getElementById("phone").value,

        bloodGroup: document.getElementById("bloodGroup").value,

        location: document.getElementById("location").value

    };

    try {

        const response = await fetch("http://localhost:5000/donor", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(donorData)

        });

        const data = await response.json();

        alert(data.message);

    } catch (error) {

        console.log(error);

    }

});