const path = require('path');
const sass = require('sass')
const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const browserslist = require('browserslist');
const { transform, browserslistToTargets } = require("lightningcss");

module.exports = function(eleventyConfig) {
	eleventyConfig.addTemplateFormats("scss");

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./src/assets/": "/",
	});

	eleventyConfig.addPassthroughCopy("**/*.{svg,webp,png,jpeg,jpg}");

	eleventyConfig.addPassthroughCopy("font.woff2");


	// // Recognize Sass as a "template languages"
	// eleventyConfig.addTemplateFormats("scss");

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");
	
	// Compile Sass
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: async function (inputContent, inputPath) {
			// Skip files like _fileName.scss
			let parsed = path.parse(inputPath);
			if (parsed.name.startsWith("_")) {
				return;
			}

			// Run file content through Sass
			let result = sass.compileString(inputContent, {
				loadPaths: [parsed.dir || "./_includes/styles"],
				sourceMap: false, // or true, your choice!
			});

			// Allow included files from @use or @import to
			// trigger rebuilds when using --incremental
			this.addDependencies(inputPath, result.loadedUrls);

			let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));

			return async () => {
				let { code } = await transform({
					code: Buffer.from(result.css),
					minify: false,
					sourceMap: true,
					targets,
				});
				return code;
			};
		},
	});

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 2 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});


  return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid"
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "src",                     // default: "."
			includes: "_includes",      // default: "_includes"
      layouts: "_includes/layouts", // default: "_layouts"
      content: "content",         // default: "content"
			data: "_data",              // default: "_data"
			output: "_site"
		},
  };
};
