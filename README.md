# Groundwork
## By With Design - A Lightweight wordpress boilerplate theme.

A minimalistic WordPress starter theme, based on <a href="http://underscores.me/">Underscores</a>


## Prerequisites
* Node.js 8.x.x and npm 5.x.x
* Gulp.js - from Terminal or Command Prompt run `npm install --global gulp`

**Note: if you run into errors when using Terminal, you may have to use the sudo command to install Gulp.js. For instance, `sudo npm install -g gulp`**

## How to get started
1. Clone the project onto your `themes` directory `(./wp-content/themes)`
2. From the theme directory, run `npm install`. All of the theme dependencies will be installed into `node_modules`.
4. Run `npm run dev` or `npm run build` to run a one-time compile of assets.

## Gulp
Gulp will handle Sass compiling, vendor-prefixing, CSS/JS minification and browser reloading. It will watch your Sass, JS and PHP files and will compile when a change is made, inject new CSS after compilation and will reload the browser when your PHP and JS files change.

### You have 3 gulp commands that you can use:
1. `gulp serve` or `npm run dev` - will run all of the gulp tasks, watch your files, and start a node server that does auto refreshing and CSS injection
2. `gulp watch` or `npm run watch` - everything in `gulp serve` except running the node server
3. `gulp` - a one-time command that will run your Sass, JS and image tasks

**CSS/Sass Tasks** – gulp will compile a compressed CSS and sourcemap file for you.

**JavaScript Tasks** - gulp will concatenate all of the JavaScript files located in `./assets/js` into a new file named `app.js`.

**What's up with the '_dist' directory?** - the `./assets/dist` directory is where gulp will send prepared JS and CSS files. The logic behind this is simply a nice segregated place to send and enqueue our files generated by gulp (outputs). That way we can keep our inputs and outputs separated. If you're not a fan and want it to go somewhere else, just adjust the `gulp.dest()` paths in the `gulpfile.js` for the 'js' and 'styles' tasks. Be sure to adjust your enqueue path in `functions.php` as well.
