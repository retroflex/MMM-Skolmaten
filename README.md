# MMM-Skolmaten
A MagicMirror² module that shows school lunch menus in Sweden from www.skolmaten.se.

# Install
1. Clone repo into ../MagicMirror/modules/ folder.
2. Run "npm install" inside ../MagicMirror/modules/MMM-Skolmaten/ folder.
3. Add the module to the ../MagicMirror/config/config.js:
```
		{
			module: 'MMM-Skolmaten',
			header: 'Furuhällskolan',
			position: 'bottom_right',
			config: {
				url: 'http://skolmaten.se/furuhallskolan/rss/'
			}
		},
```
