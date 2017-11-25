/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.newFileIcons) === 'undefined') extensions.newFileIcons = {
	version: '1.0.1'
};

(function() {
	const DEBUG = false;
		
	this.installIcons = function() {
		Components.utils.import("resource://gre/modules/FileUtils.jsm");
		
		var profileIcons = FileUtils.getDir("ProfD", ["icons", "fileicons"]);
		var installFolderIcons = FileUtils.getDir("CurProcD", ["chrome", "icons", "default", "fileicons"]);
		var pluginIconsDir = FileUtils.getDir("ProfD", ["extensions", "newFileIcons@babobski.com", "icons"]);
		// Remove existing icons
		try {
			while (profileIcons.exists() && profileIcons.directoryEntries.hasMoreElements()) {
				try {
					var icon = profileIcons.directoryEntries.getNext();
					profileIcons.remove(icon);
				} catch(e) {
					if (DEBUG) {
						console.log(e);
					}
					if (e.name === 'NS_ERROR_FILE_ACCESS_DENIED') {
						throw new fileExeption('File access denied');
					}
				}
			}
			
			var entries = pluginIconsDir.directoryEntries;
			while(entries.hasMoreElements()) {
				try {
					 var entry = entries.getNext();
					entry.QueryInterface(Components.interfaces.nsIFile);
					entry.copyTo(installFolderIcons, entry.leafName);
				} catch(e) {
					if (DEBUG) {
						console.log(e);
					}
					if (e.name === 'NS_ERROR_FILE_ACCESS_DENIED') {
						throw new fileExeption('File access denied');
					}
				}
			}
		} catch(e) {
			console.log(e);
			var close = confirm("To generate the new file icons, you need to run Komodo in administrator mode.");
			
			if (close == true) {
				Components.classes["@mozilla.org/toolkit/app-startup;1"]
				.getService(Components.interfaces.nsIAppStartup)
				.quit(
					Components.interfaces.nsIAppStartup.eAttemptQuit
				);
			}
			return false;
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
	
	function fileExeption(message) {
		this.message = message;
		this.name = 'FileExeption';
	}
	
	
   
}).apply(extensions.newFileIcons);
