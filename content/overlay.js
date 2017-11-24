/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.newFileIcons) === 'undefined') extensions.newFileIcons = {
	version: '1.0'
};

(function() {
	
    var $       	= require("ko/dom"),
		notify		= require("notify/notify"),
		eol     	= ['CRLF', 'CR', 'LF'],
		self		= this;
		
	this.installIcons = function() {
		Components.utils.import("resource://gre/modules/FileUtils.jsm");
		
		
		// get the "data.txt" file in the profile directory
		var profileIcons = FileUtils.getDir("ProfD", ["icons", "fileicons"]);
		var installFolderIcons = FileUtils.getDir("CurProcD", ["chrome", "icons", "default", "fileicons"]);
		var pluginIconsDir = FileUtils.getDir("ProfD", ["extensions", "newFileIcons@babobski.com", "icons"]);
		// Remove existing icons
		
		while (profileIcons.exists() && profileIcons.directoryEntries.hasMoreElements()) {
			try {
				var icon = profileIcons.directoryEntries.getNext();
				profileIcons.remove(icon);
			} catch(e) {
				console.log(e);
			}
		}
		
		
		
		var entries = pluginIconsDir.directoryEntries;
		var array = [];
		while(entries.hasMoreElements()) {
			try {
				 var entry = entries.getNext();
				entry.QueryInterface(Components.interfaces.nsIFile);
				entry.copyTo(installFolderIcons, entry.leafName);
			} catch(e) {
				console.log(e);
			}
		}
		
		
		var reboot = confirm("To generate the new icons, you need to reboot Komodo");
		
		if (reboot == true) {
			Components.classes["@mozilla.org/toolkit/app-startup;1"]
			.getService(Components.interfaces.nsIAppStartup)
			.quit(
			Components.interfaces.nsIAppStartup.eRestart |
			Components.interfaces.nsIAppStartup.eAttemptQuit
			);
		}
	};
	
	
   
}).apply(extensions.newFileIcons);
