var buildList = function() {
	var list = document.getElementById('openWindowsList');
	var listItems = extensions.OpenWindows.generateOpenWindowsList();
	
	for (var i = 0; i < listItems.length; i++) {
		var listItem = document.createElement('listitem');
		listItem.label = listItems[i];
		list.appendChild(listItem);
	}
};
	
window.addEventListener('load', buildList);

setInterval(function(){
	buildList();
}, 5000);

