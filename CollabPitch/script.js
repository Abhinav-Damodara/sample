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
	var data = "";
	fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			data = displayData(data.results);
			return data;
		})
		.catch(function (error) {
			return data;
		});
}

function displayData(authors) {
	return authors.map(function (author, index) {
		datum.push(author);
		let li = createNode("li"),
			figure = createNode("figure");
		(img = createNode("img")),
			(strong = createNode("strong")),
			(span = createNode("span"));
		address = createNode("address");
		a = createNode("a");
		addBtn = createNode("a");
		img.src = author.picture.medium;
		strong.innerHTML = `${author.name.first} ${author.name.last}`;
		span.innerHTML = `${author.dob.age} ${author.gender}`;
		a.innerHTML = `${author.email}`;
		a.setAttribute("href", `${author.email}`);
		address.innerHTML = `${author.location.city}, ${author.location.state} , ${author.location.country}, ${author.location.postcode} `;
		append(figure, img);
		append(li, figure);
		append(li, strong);
		append(li, span);
		append(li, a);
		append(li, address);
		append(li, addBtn);
		append(ul, li);
	});
}

function prepareList(author) {
	var results = "";
	results = `<li><figure><img src=${author.picture.medium} /></figure>\n
                <strong>${author.name.first} ${author.name.last}</strong>\n
                <span>${author.dob.age}</span>\n
                <span>${author.gender}</span>\n
                <a href= ${author.email}>${author.email}</a>\n
                <address>${author.location.city}, ${author.location.state}, ${author.location.country}, ${author.location.postcode} </address>\n
                \n
                </li>`;
	return results;
}
/*-----------filter----------*/
function filter() {
	const ul = document.getElementById("authors");
	var a = document.getElementById("select");
	var b = a.options[a.selectedIndex].value;
	var items = document.getElementsByName("acs");
	var selectedItems = [];
	for (var i = 0; i < items.length; i++) {
		if (items[i].type == "checkbox" && items[i].checked == true) {
			selectedItems.push(items[i].value);
		}
	}
	var showresults = prepareFilterData(datum, b, selectedItems);
	console.log(showresults);
	showresults ? counterResults(showresults) : null;
}

function counterResults(showresults) {
	if (showresults["count"] > 0) {
		ul.innerHTML = showresults["results"];
	} else {
		ul.innerHTML = "No results found";
	}
}

function prepareFilterData(datum, b, selectedItems) {
	var results = "";
	var count = 0;
	datum.map(function (author) {
		if (b === author.gender) {
			if (selectedItems.length == 0) {
				count++;
				results += prepareList(author);
			} else {
				for (var i = 0; i < selectedItems.length; i++) {
					if (author.location.country === selectedItems[i]) {
						count++;
						console.log(author.location.country, author.name, i);
						results += prepareList(author);
					}
				}
			}
		} else if (b === "all") {
			console.log(b);
			if (selectedItems.length == 0) {
				count++;
				results += prepareList(author);
			}
			for (var i = 0; i < selectedItems.length; i++) {
				if (author.location.country === selectedItems[i]) {
					count++;
					results += prepareList(author);
				}
			}
			console.log(results);
		}
	});

	return { count: count, results: results };
}

/*-------searching-------*/
function showResults() {
	const ul = document.getElementById("authors");
	var showresults = search(authors);
	console.log(showresults);
	showresults ? counterResults(showresults) : null;
}

function search() {
	var results = "";
	var count = 0;
	var searchText = document.getElementById("search-box").value;
	console.log(searchText, datum);
	datum.map(function (author) {
		var text = author.email;
		var slicedText = text.slice(0, searchText.length);
		if (searchText === slicedText) {
			count++;
			results += prepareList(author);
		}
	});
	console.log(results, count);
	return { count: count, results: results };
}
