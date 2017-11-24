# MMM-Skolmaten
A [MagicMirror²](https://github.com/MichMich/MagicMirror) module that shows school lunch menus in Sweden from www.skolmaten.se.

![image](https://user-images.githubusercontent.com/25268023/33210971-a4bc7a02-d11c-11e7-9350-34819ec45f27.png)

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
