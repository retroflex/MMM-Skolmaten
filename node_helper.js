/* MagicMirror²
 * Module: MMM-Skolmaten
 *
 * By Johan Persson, https://github.com/retroflex
 * MIT Licensed.
 */

const Log = require("logger");
const NodeHelper = require("node_helper");
const Parser = require("rss-parser");

module.exports = NodeHelper.create({
	start () {
	},

	// Send RSS items to the module js.
	// @param url - URL of the RSS feed.
	// @param items - Array of RSS items. Each item has a title and a description.
	// @param self - Pointer to this. Needed when this method is used as callback.
	broadcastItems (url, items, self) {
		self.sendSocketNotification("ITEMS", {
			url,
			items
		});
	},

	// Notification from module js.
	// @param notification - Notification type.
	// @param payload - Contains url of RSS feed.
	socketNotificationReceived (notification, payload) {
		if (notification === "LOAD_FEED") {
			this.loadFeed(payload.url, this.broadcastItems);
		}
	},

	// Load and parse an RSS feed.
	// @param url - URL of the RSS feed.
	// @param allEntriesParsedCB - Callback called when all RSS items have been parsed.
	//                             See broadcastItems() for args doc.
	async loadFeed (url, allEntriesParsedCB) {
		const items = [];
		const self = this;
		const parser = new Parser();

		try {
			const feed = await parser.parseURL(url);
			const len = feed.items.length;
			let count = 0;

			feed.items.forEach((item) => {
				items.push({title: item.title, description: item.content});
				++count;

				if (count === len) {
					allEntriesParsedCB(url, items, self);
				}
			});
		} catch (error) {
			Log.error(error);
		}
	}
});
