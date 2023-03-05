// Identify all of the unique tag names in the HTML string, and print them in alphabetical (lexicographical) order.

function processData(input) {
  const pattern = /<([a-z0-9]+)[ >]/g;
  const matches = input.match(pattern);
  const tagNames = new Set(matches.map(match => match.slice(1, -1)));
  console.log(Array.from(tagNames).sort().join(';'));
}

processData(`<!DOCTYPE html>
<html>
<head>
<title>HTML</title>
</head>
<body>
<h1>Parsing HTML using JS!!</h1>
<div>JavaScript is a great language.</div>
<div>It has a lot of libraries.</div>
<p>Here is a
<a href="http://www.quackit.com/html/tutorial/html_links.cfm">link</a>
to more information.</p>
</body>
</html>`);

// Expected output: a;body;div;head;h1;html;p;title

// https://www.hackerrank.com/challenges/detect-html-tags/problem