var Morda = require('../../components/morda');
var React = require('react');

document.addEventListener("DOMContentLoaded", function() {
    React.renderComponent(Morda({ context: window._sharedData }), document.body);
});


