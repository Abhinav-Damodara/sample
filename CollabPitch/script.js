const ul = document.getElementById("authors");

function createNode(element) {
	return document.createElement(element);
}

function append(parent, el) {
	return parent.appendChild(el);
}

window.onload = fetchData("https://randomuser.me/api/?results=10");
var datum = [];

function fetchData(url) {
	fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			datum = data.results;
			displayData(datum);
		})
		.catch(function (error) {
			console.error('Error fetching data:', error);
		});
}

function displayData(authors) {
	ul.innerHTML = '';
	authors.forEach(function (author) {
		let li = createNode("li"),
			figure = createNode("figure"),
			img = createNode("img"),
			strong = createNode("strong"),
			span = createNode("span"),
			address = createNode("address"),
			a = createNode("a");

		img.src = author.picture.medium;
		strong.innerHTML = `${author.name.first} ${author.name.last}`;
		span.innerHTML = `${author.dob.age} ${author.gender}`;
		a.innerHTML = `${author.email}`;
		a.setAttribute("href", `mailto:${author.email}`);
		address.innerHTML = `${author.location.city}, ${author.location.state}, ${author.location.country}, ${author.location.postcode}`;

		append(figure, img);
		append(li, figure);
		append(li, strong);
		append(li, span);
		append(li, a);
		append(li, address);
		append(ul, li);
	});
}

function prepareList(author) {
	return `<li><figure><img src="${author.picture.medium}" /></figure>
                <strong>${author.name.first} ${author.name.last}</strong>
                <span>${author.dob.age}</span>
                <span>${author.gender}</span>
                <a href="mailto:${author.email}">${author.email}</a>
                <address>${author.location.city}, ${author.location.state}, ${author.location.country}, ${author.location.postcode}</address>
            </li>`;
}

/*-----------filter----------*/
function filter() {
	var items = document.getElementsByName("acs");
	var selectedItems = [];
	for (var i = 0; i < items.length; i++) {
		if (items[i].type === "checkbox" && items[i].checked) {
			selectedItems.push(items[i].value);
		}
	}
	var showresults = prepareFilterData(datum, selectedItems);
	showresults ? counterResults(showresults) : null;
}

function counterResults(showresults) {
	if (showresults["count"] > 0) {
		ul.innerHTML = showresults["results"];
	} else {
		ul.innerHTML = "No results found";
	}
}

function prepareFilterData(datum, selectedItems) {
	var results = "";
	var count = 0;
	datum.forEach(function (author) {
		if (selectedItems.length === 0 || selectedItems.includes(author.location.country)) {
			count++;
			results += prepareList(author);
		}
	});
	return { count: count, results: results };
}

/*-------searching-------*/
function showResults() {
	var showresults = search();
	showresults ? counterResults(showresults) : null;
}

function search() {
	var results = "";
	var count = 0;
	var searchText = document.getElementById("search-box").value.toLowerCase();
	datum.forEach(function (author) {
		var email = author.email.toLowerCase();
		if (email.startsWith(searchText)) {
			count++;
			results += prepareList(author);
		}
	});
	return { count: count, results: results };
}
