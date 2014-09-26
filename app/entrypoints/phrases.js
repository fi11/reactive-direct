var Phrases = require('../../components/phrases');
var React = require('react');
console.log('PHRASES');

document.addEventListener("DOMContentLoaded", function() {
    Phrases.init(window._sharedData);
});


