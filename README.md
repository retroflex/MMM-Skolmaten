# MMM-Skolmaten
A [MagicMirror²](https://github.com/MichMich/MagicMirror) module that shows school lunch menus in Sweden from www.skolmaten.se.

![image](https://user-images.githubusercontent.com/25268023/33210971-a4bc7a02-d11c-11e7-9350-34819ec45f27.png)

# Install
1. Clone repo into ../MagicMirror/modules/ folder:
```
	cd MagicMirror/modules/
	git clone https://github.com/retroflex/MMM-Skolmaten
```
2. Install dependencies:
```
	cd MMM-Skolmaten/
	npm install
```
3. Add the module to the ../MagicMirror/config/config.js, example:
```
		{
			module: 'MMM-Skolmaten',
			header: 'Furuhällskolan',
			position: 'bottom_right',
			config: {
				url: 'https://skolmaten.se/furuhallskolan/rss/'
			}
		},
```

# Configuration
Using the https://skolmaten.se/furuhallskolan/rss/ URL will show lunch for the next seven days (including today).

You can choose how many days should be shown by using another URL, although I haven't tested that. More info here:
https://skolmaten.se/about/rss/furuhallskolan/

# Details
This module simply shows an RSS feed, with some limitations (which are not a problem with skolmaten.se):
1. Hard coded to update RSS feed once an hour.
2. Always shows all entries in the RSS feed.
3. Hard coded in Swedish.

I still wanted to keep this as a separate module instead of a generic RSS module, too keep things simple and allow for future specific features.

# To Do
Handle invalid URL's.
