function getState(name, condition) {
    var state = arguments.length > 1 ? (condition ? name : '') : name;

    return state ? ' _' + state : '';
}

function getView(view) {
    return view ? '_' + view : '';

}

module.exports = {
    state: getState,

    view: getView,

    block: function(name, view) {
        var name = name + getView(view);

        return {
            name: name,
            state: function(states) {

                return name + [].concat(states || []).reduce(function(a, b) {
                    return a + getState(b);
                });
            },
            elem: function(elemName) {
                return name + '__' + elemName;
            }
        }
    }
};


//var b = bevis('button', 'islands');

//b.name;
//b.elem('text');
//b.state('selected');
