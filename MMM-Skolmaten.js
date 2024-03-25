/* MagicMirror²
 * Module: MMM-Skolmaten
 *
 * By Johan Persson, https://github.com/retroflex
 * MIT Licensed.
 */

Module.register("MMM-Skolmaten", {
	// Default configuration.
	// url is URL of RSS feed, e.g. 'https://skolmaten.se/furuhallskolan/rss/'.
	defaults: {
		url: ""
	},

	getStyles () {
		return ["modules/MMM-Skolmaten/css/MMM-Skolmaten.css"];
	},

	// Notification from node_helper.js.
	// The RSS items are received here and copied. Then module is redrawn.
	// @param notification - Notification type.
	// @param payload - Contains url and array of items of RSS feed. Each item has a title and a description.
	socketNotificationReceived (notification, payload) {
		if (notification === "ITEMS") {
			if (payload.url === this.config.url) {
				this.items = [];

				const len = payload.items.length;
				for (let i = 0; i < len; ++i) {
					const item = payload.items[i];
					this.items.push(item);
				}

				this.updateDom(0);
			}
		}
	},

	// Override dom generator.
	getDom () {
		const wrapper = document.createElement("div");

		for (const i in this.items) {
			const item = this.items[i];

			const titleDiv = document.createElement("p");
			titleDiv.className = "itemtitle";
			titleDiv.innerHTML = item.title;
			wrapper.appendChild(titleDiv);

			const descDiv = document.createElement("div");
			descDiv.className = "itemdescription";
			descDiv.innerHTML = item.description;
			wrapper.appendChild(descDiv);
		}

		return wrapper;
	},

	// Override start to init stuff.
	start () {
		// Send anything to initiate communication / node helper.
		this.sendSocketNotification("START", {message: "start connection"});

		// Loading message. No translation needed, this is Swedish only anyway.
		this.items = [];
		this.items.push({title: "Laddar...", description: ""});

		// Tell node_helper to load RSS feed at startup.
		this.sendSocketNotification("LOAD_FEED", {url: this.config.url});

		// Make sure RSS feed is reloaded each hour.
		const self = this;
		setInterval(() => {
			self.sendSocketNotification("LOAD_FEED", {url: self.config.url});
		}, 60 * 60 * 1000); // In millisecs. Refresh every hour.
	}
});
