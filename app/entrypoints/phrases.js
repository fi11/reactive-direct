var Phrases = require('../../components/phrases');
var React = require('react');

document.addEventListener("DOMContentLoaded", function() {
    React.renderComponent(Phrases({ context: window._sharedData }), document.getElementById('main'));
});



