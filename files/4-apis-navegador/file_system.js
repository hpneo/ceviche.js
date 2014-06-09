var requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

var handleError = function(error) {
  console.log(error.name, error.message);
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

requestFileSystem(window.TEMPORARY, 1024 * 1024 * 5, function(fileSystem) {
  fileSystem.root.getFile('demo.txt', {}, function(fileEntry) {
    fileEntry.file(function(file) {
      console.log(file);
      var reader = new FileReader();

      reader.onloadend = function(e) {
        console.log(this.result);
      };
      
      reader.readAsText(file);
    }, handleError);
  }, handleError);
}, handleError);

requestFileSystem(window.TEMPORARY, 1024 * 1024 * 5, function(fileSystem) {
  fileSystem.root.getFile('demo.txt', { create: false }, function(fileEntry) {
    fileEntry.createWriter(function(writer) {
      writer.seek(writer.length);

      writer.onwriteend = function(e) {
        console.log('Archivo actualizado.');
      };

      var blob = new Blob(['\n', 'Texto', ' de ', 'prueba']);
      writer.write(blob);
    }, handleError);
  }, handleError);
}, handleError);