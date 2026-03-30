# Bancroft_proto
v1.2

Bancroft_proto is a javascript library that appends useful methods to the built-in the String & Number prototypes.

All Bancroft_proto methods are preceded with an underdash to clearly distinguish them from built-in methods.

> *Note:* as of version 1.2, not all methods are complete, and not all have been rigorously tested. Please review the source code before use, and use at your own discretion.
> *Known Incomplete functions:* 
	> - epochTo(): only supports 'recent', doesn't handle 'just now'

## How to use in your code.
Import the bancroft_proto script before other scripts. This adds the methods onto the built-in prototypes, making them available in subsequent scripts.
For the most reliable results in HTML pages, it is recommended to load the script in the `<head/>` tag, with the `defer` attribute with the `text/javascript` mimetype. This will allow both text/js and module scripts to use it.
You can also import it with ES6 syntax, or require it in Nodejs.


For Example:
```html
<!DOCTYPE=HTML>
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
			${myObj.second.content.split(' ').map(str => str.match(/\d+/) ? str._cfk('f', 'C', true, 1) : str).join(' ')}
		</span><br>
		<span>
			<b>${myObj.third.title._toTitleCase('-')}</b>
			${myObj.third.content}°F (${myObj.third.content._cfk('f', 'K')})
		</span>`;
</script>
</body>
</HTML>
```
