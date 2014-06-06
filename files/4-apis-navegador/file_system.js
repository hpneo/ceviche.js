var requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

var handleError = function(error) {
  console.log(error.name, error.description);
};

requestFileSystem(window.TEMPORARY, 1024 * 1024 * 5, function(fileSystem) {
  fileSystem.root.getFile('demo.txt', { create: true }, function(fileEntry) {
    fileEntry.createWriter(function(writer) {
      writer.onwriteend = function(e) {
        console.log('Archivo creado.');
      };

      var blob = new Blob(['Demo']);
      writer.write(blob);
    }, handleError);
  }, handleError);
}, handleError);