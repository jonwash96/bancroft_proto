# Bancroft_proto
v1.2

Bancroft_proto is a javascript library that appends useful methods to the built-in the String & Number prototypes.

All Bancroft_proto methods are preceded with an underdash to clearly distinguish them from built-in methods.

> *Note:* as og version 1.2, not all methods are complete, and not all have been rigorously tested or peer reviewed. Please review the source code before use, and use at your own discretion.
> *Known Incomplete functions:* 
	> - epochTo()

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
	<script defer type="text/javascript" src="https://www.github.com/jonwash96/bancroft_proto/index.html"></script>
</head>
<body>
	<h1>Hello, World!</h1>
	<p id="text-space"></p>
	<p id="compare-result">
		<span><b>First Prop: This is the first property</b>
<script type="text/javascript">
	const textSpace = document.getElementById('text-space');
	const anObjAsEntries = [
		["firstProp", "This is the first property"],
		["second_prop", "This is the first property"],
		["temp-is", 56]
	]
	textSpace.textContent = 
