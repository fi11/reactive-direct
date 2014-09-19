module.exports = {
    state: function(name, condition) {
        var state = arguments.length > 1 ? (condition ? name : '') : name;

        return state ? ' _' + state : '';
    },

    view: function(view) {
        return view ? '_' + view : '';
    }
};
