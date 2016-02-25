$(document).ready(function() {
	getGalleriesList = getGalleries();
	getGalleriesList.done(function(data) {
		for (var i=0; i<data.length; i++) {
			gallery = data[i];
			element = galleryElementTemplate(gallery.id, gallery.name, gallery.date, gallery.thumbnail);
			
			$("#list-container").append(element);
		}
		$(".entry").click(onClick);
	})

});


function onClick() {
	var pswpElement = document.querySelectorAll('.pswp')[0];
	var galleryId = $(this).data("galleryid");
	var thumbnail = $(this).children("img");
	var items = [
		{
			"src": thumbnail.attr("src"),
			"w": thumbnail.data("width"),
			"h": thumbnail.data("height"),
			"title": thumbnail.data("title")
		}
	];
	var options = {
		index: 0
	};
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	gallery.init();
	var a = loadGalleryImages(galleryId);
	a.done(function(data) {
		for (var i=0; i < data.length; i++)
			items.push(data[i]);
		gallery.invalidateCurrItems();
		// updates the content of slides
		gallery.updateSize(true);
	});
}
function loadGalleryImages(galleryId) {
	return $.ajax({
		url: "http://demo2933803.mockable.io/galeria", 
		data: {
			id: galleryId
		},
		error: function(a,b,c) {
			console.log(a);
			console.log(b);
			console.log(c);
		}
	});

}

function getGalleries() {
	return $.ajax({
		url: "http://demo2933803.mockable.io/lista",
		data: {
			count: 4
		},
		error: function(a,b,c) {
			console.log(a);
			console.log(b);
			console.log(c);
		}
	})
}

function galleryElementTemplate(id, name, date, thumbnail) {
	return " "+
		"<div class=\"entry col-md-3 col-sm-6\" data-galleryid=\""+ id +"\">" +
		"	<img class=\"img-responsive \" src=\""+ thumbnail.src +"\" data-width=\""+thumbnail.w+"\" data-height=\""+thumbnail.h+"\" data-title=\""+thumbnail.title+"\">" +
		"	<div class=\"description\">" +
		"		<h3>"+ name +"</h3>" +
		"		<span class=\"date\">"+ date +"</span>" +
		"	</div>" +
		"</div>"
	;
}