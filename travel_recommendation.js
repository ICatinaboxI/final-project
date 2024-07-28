function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
  
    clearResults(); // Call the clearResults() function
  
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let items;
  
        if (input === 'countries' || input === 'country' || input === 'COUNTRIES' || input === 'COUNTRY') {
          items = data.countries;
          items.forEach(country => {
            resultsDiv.innerHTML += `<h2>${country.name}</h2>`;
            country.cities.forEach(city => {
              resultsDiv.innerHTML += `<h3>${city.name}</h3>`;
              resultsDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}">`;
              resultsDiv.innerHTML += `<p><strong>Description:</strong> ${city.description}</p>`;
              resultsDiv.innerHTML += '<hr>';
            });
          });
          return;
        } else if (input === 'temples' || input === 'temple' || input === 'TEMPLES' || input === 'TEMPLE') {
          items = data.temples;
        } else if (input === 'beaches' || input === 'beach' || input === 'BEACHES' || input === 'BEACH') {
          items = data.beaches;
        } else {
          items = data.temples.filter(temple => temple.name.toLowerCase() === input);
          if (items.length === 0) {
            items = data.countries.filter(country => country.name.toLowerCase() === input);
            if (items.length > 0) {
              items[0].cities.forEach(city => {
                resultsDiv.innerHTML += `<h3>${city.name}</h3>`;
                resultsDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}">`;
                resultsDiv.innerHTML += `<p><strong>Description:</strong> ${city.description}</p>`;
                resultsDiv.innerHTML += '<hr>';
              });
              return;
            }
          }
          if (items.length === 0) {
            items = data.beaches.filter(beach => beach.name.toLowerCase() === input);
          }
        }
  
        if (items.length > 0) {
          items.forEach(item => {
            resultsDiv.innerHTML += `<h2>${item.name}</h2>`;
            resultsDiv.innerHTML += `<img src="${item.imageUrl}" alt="${item.name}">`;
            resultsDiv.innerHTML += `<p><strong>Description:</strong> ${item.description}</p>`;
            resultsDiv.innerHTML += '<hr>';
          });
        } else {
          resultsDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultsDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
  
  function clearResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  }
  
  document.getElementById('btnSearch').addEventListener('click', searchCondition);
  document.getElementById('btnClear').addEventListener('click', clearResults);