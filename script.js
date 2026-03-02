const fetchPic = async () => {

    const Card = document.getElementById("country-info");
    const infoCard = document.getElementById("country-input");
    const borderCountryCard = document.getElementById("bordering-countries");
    const errCard = document.getElementById("error-message");
    const spinner = document.getElementById("loading-spinner");

    const countryName = infoCard.value;

    Card.innerHTML = "";
    borderCountryCard.innerHTML = "";
    errCard.textContent = "";

    spinner.classList.remove("hidden");

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) throw new Error();

        const data = await response.json();

        const pop = data[0].population.toLocaleString();

        const stringOut = data[0].name.common + "\n" + data[0].capital + "\n" +     pop + "\n" +
            data[0].region + "\n";

        const countryInfo = document.createElement("p");

        countryInfo.textContent = stringOut;

        const pic = document.createElement("img");

        pic.src = data[0].flags.png;

        Card.appendChild(countryInfo);
        Card.appendChild(pic);

        const neighbors = data[0].borders;

        if (neighbors) {
            for (let i = 0; i < neighbors.length; i++) {

                const code = neighbors[i];

                const neighborResponse = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

                if (!neighborResponse.ok) continue;

                const neighborData = await neighborResponse.json();

                const borderName = document.createElement("p");

                borderName.textContent = neighborData[0].name.common;

                const borderImg = document.createElement("img");

                borderImg.src = neighborData[0].flags.png;

                borderCountryCard.appendChild(borderName);
                borderCountryCard.appendChild(borderImg);
            }
        }

    } catch (err) {
        errCard.textContent = "Country not found";
    }
};