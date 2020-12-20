window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if(!window.indexedDB){
    alert('the browser doesn\'t support indexedDB')
}

let request = window.indexedDB.open('Variables', 1),
    db,
    tx,
    store;
    // index;

request.onerror = function(e){
    console.log('There was an error: ' + e.target.errorCode);
}

request.onsuccess = function(e){
    db = request.result
}

request.onupgradeneeded = function(e){
    let db = request.result,
        store = db.createObjectStore('VariableStore', {
            keyPath: 'info'})
        // index = store.createIndex('questionText', 'questionText', )
}


webix.ui({
    rows: [
        {
            view: "label",
            label: "Beulah Works Data Analysis Engine"
        },

        {
            view: "menu",
            id: "my_menu",
            data: [
                { id: "1", value: "Home Page" },
                { id: "2", value: "Upload Dataset" },
                { id: "3", value: "Data Analysis", submenu: ["English", "French", "German"] },
                { id: "4", value: "Log Out" }
            ],
            type: {
                subsign: true,
            },
            on: {
                onItemClick: function (id) {
                    if (id == "2")
                        alert("File Upload Successful")
                }
            }
        },

        {
            view: "label",
            label: "Request Dataset Information"


        },

        {
            view: "combo",
            id: "field_m",
            label: "Select Csv Dataset",
            value: "One",
            options: ["One", "Two", "Three"]
        },

        {
            view: "button", id: "my_button", value: "Show",
            type: "value", value: "Show", inputWidth: 100
        }

    ]
});

$$("my_button").attachEvent("onItemClick", function () {
    webix.ajax().post("http://35.224.201.19/ocpu/library/omnibus/R/get_data_info/json?auto_unbox=TRUE").then(
        function (data) {
            info = data.json();
            console.log(info);
            localStorage.setItem('information', JSON.stringify(info))
            window.open('newPage.html');
        }, function (err) {
            console.log(err.response);
        })
    });