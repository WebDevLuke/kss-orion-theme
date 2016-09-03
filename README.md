KSS Orion Theme
=================

This is a basic template for [kss-node](https://github.com/kss-node/kss-node) styleguide. 
"kss-node" is a NodeJS implementation of [Knyle Style Sheets](https://github.com/kneath/kss) (KSS).

Screenshot
--------

<p align="center">
   <img width="750" height="418" src="https://raw.githubusercontent.com/WebDevLuke/kss-orion-theme/master/misc/screen.png" style="border:1px solid #ddd;">
  <p align="center">##A flat simplistic theme for kss-node</p>
</p>

How to use this template
--------------------------
1. Install kss-node. Type `npm install kss`.
2. git clone https://github.com/WebDevLuke/kss-orion-theme.git and copy the "template" folder into your working directory.
3. Run `kss-node` command with `--template` option, like below.


```
kss-node <sourcedir> --template path/to/template
```

Alternatively if you're using Gulp you can set up a task to compile your style guide by adapting the below:

```
var options = {};
options.styleGuide = {
	"source": [
	  "dev/"
	],
	"destination":  "styleguide/dist/",
	"css": [
	  "../../dist/css/style.css"
	],
	homepage: '../../styleguide/kss-orion-theme/homepage.md',
	title: 'Style Guide',
	template: "styleguide/kss-orion-theme"
};

gulp.task('styleguide', function(cb) {
	kss(options.styleGuide, cb);
});
```