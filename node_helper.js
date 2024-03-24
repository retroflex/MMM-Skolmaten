/* MagicMirror²
 * Module: MMM-Skolmaten
 *
 * By Johan Persson, https://github.com/retroflex
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const Parser = require('rss-parser');

module.exports = NodeHelper.create({
	start: function() {
	},

	// Send RSS items to the module js.
	// @param url - URL of the RSS feed.
	// @param items - Array of RSS items. Each item has a title and a description.
	// @param self - Pointer to this. Needed when this method is used as callback.
	broadcastItems: function(url, items, self) {
		self.sendSocketNotification('ITEMS', {
			url: url,
			items: items
		});
	},
	
	// Notification from module js.
	// @param notification - Notification type.
	// @param payload - Contains url of RSS feed.
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'LOAD_FEED') {
			this.loadFeed(payload.url, this.broadcastItems);
			return;
		}
	},

	// Load and parse an RSS feed.
	// @param url - URL of the RSS feed.
	// @param allEntriesParsedCB - Callback called when all RSS items have been parsed.
	//                             See broadcastItems() for args doc.
	loadFeed: function(url, allEntriesParsedCB) {
		var items = [];
		var self = this;

		Parser.parseURL(url, function(err, parsed) {
			var len = parsed.feed.entries.length;
			var count = 0;

			parsed.feed.entries.forEach(function(entry) {
				items.push( { title: entry.title, description: entry.content } );
				++count;

				if (count === len) {
					allEntriesParsedCB(url, items, self);
				}
			});
		});
	}
});
