# Bancroft_proto
v1.2.1

Bancroft_proto is a javascript library that appends useful methods to the built-in the String & Number prototypes.

All Bancroft_proto methods are preceded with an underdash to clearly distinguish them from built-in methods.

> **Note:** As of version 1.2, All functions work, though have been rigorously tested. Please review the source code before use, and use at your own discretion.
>
> *Known Issues:* 
> >epochTo(): only supports 'recent', doesn't handle 'just now'

***

> *Changelog:*
> - v1.2.1: togglePlural() update: Supports params for count & alt suffixes.

## How to use in your code.
1. Clone this repository into your project.
	- `git clone https://github.com/jonwash96/bancroft_proto .`
2. **Load the bancroft_proto script before other scripts that use it.**
 - This adds the methods onto the built-in prototypes, making them available in subsequent scripts.
- You can also import it with ES6 syntax, or require it in Nodejs without setting it to a variable.
	- HTML: `<script type="text/javascript" src="./bancroft_proto"></script>`
	- CJS: `require('./bancroft_proto')` 
	- ES6: `import './bancroft_proto'`


For Example:
```html
<!DOCTYPE HTML>
<HTML>
<head>
	<meta charset="utf8">
	<script type="text/javascript" src="./index.js"></script>
</head>
<body>
	<h1>Hello, World!</h1>

	<h2>Original</h2>
	<p id="original">
	</p>

	<h2>Results</h2>
	<p id="result">
	</p>

	<h2>Hard Coded Comparison</h2>
	<p id="compare-result">
		<span>
			<b>First Prop:</b>
			This Is The First Property
		</span><br>
		<span>
			<b>Second-Prop:</b>
			It's 11.1C outside.
		</span><br>
		<span>
			<b>Temp Is:</b>
			56°F (329.15°K)
		</span>
		<span>
			<b>Temp Is:</b>
			56°F (329.15°K)
		</span>
		<span>
			<b>Fruit Is</b>
			Quantity of: 10682 = cranberries
			Quantity of: 1 = cranberry
			Quantity of: 5 = Cranberrys
		</span>
	</p>

<script type="text/javascript">
	const original = document.getElementById('original');
	const result = document.getElementById('result');

	const myObj = {
		first: {
			title: "firstProp",
			content: "this is the first property"
		},
		second: {
			title: "second_prop",
			content: "It's 52degF outside."
		},
		third: {
			title: "temp-is",
			content: 56
		},
		fourth: {
			title: "fruitIs",
			quantityA: 10682,
			quantityB: 1,
			content: "cranberry"
		}
	};

	for (const K in myObj) {
		const el = document.createElement('div')
		el.innerHTML = `<b>${myObj[K].title}:</b> ${myObj[K].content}`
		original.appendChild(el)
	};

	result.innerHTML = `
		<span>
			<b>${myObj.first.title._camelToTitle()}</b>
			${myObj.first.content._toTitleCase()}
		</span><br>
		<span>
			<b>${myObj.second.title._toTitleCase('_','-')}</b>
			${myObj.second.content.split(' ')
				.map(str => str.match(/\d+/) 
					? str._cfk('f', 'C', true, 1) 
					: str
			).join(' ')}
		</span><br>
		<span>
			<b>${myObj.third.title._toTitleCase('-')}</b>
			${myObj.third.content}°F (${myObj.third.content._cfk('f', 'K')})
		</span>
		<span>
			<b>${myObj.fourth.title._camelToTitle()}</b>
			Quantity of: ${myObj.fourth.quantityA} = ${myObj.fourth.content._togglePlural(myObj.fourth.quantityA, 'ies', 'y')}<br/>
			Quantity of: ${myObj.fourth.quantityB} = ${myObj.fourth.content._togglePlural(myObj.fourth.quantityB, 'ies', 'y')}<br/>
			Quantity of: 5 = ${myObj.fourth.content._togglePlural(5)._toTitleCase()}
		</span>`;
</script>
</body>
</HTML>
```

***For the curious:*** *It's a conceptual play on words; If you've seen the Netflix series "Altered Carbon", and also know Javascript, then you probably get it 😉. Otherwise, that's just the name.*