console.log('this is postman Project');

// utility functions:
// 1.utility function to get DOM element from String.
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Intialize the number of parameter
let addedParamCount = 0;
// hide the parameterBox initially.
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if the user clicks on  custom params box hide the JsonBox
let customRadio = document.getElementById('custom');
customRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';

    // none display means hide,block display means show
});

// if the user clicks on  JsonBox box hide the paramsBox
let jsonRadio = document.getElementById('json');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
});

// if the user clicks on "+" button add more parameter
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', add);
function add() {
    let params = document.getElementById('params');
    let string = ` <div id="parametersBox ">
                        <div class="row my-2">
                            <label for="url" class="col-sm-2 col-form-label">Parameter${addedParamCount + 2}</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                            </div>
                            <button class="btn btn-primary col-sm-1 deleteParam" id="addParam"> - </button>
                        </div>

        </div>`;
    // convert element string to dom node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // Add an event listener to remove the parameter on clicking '-' button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();

        })
    }
    addedParamCount++;
}

// if the user click on Submit button

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = 'Please wait.. Fetching Response...';
    document.getElementById('code').innerHTML = '<p> please wait..Fetching Response </p>';
    // fetch all the value user has entered
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='radio']:checked").value;
    let contentType = document.querySelector("input[name='content']:checked").value;


    // if user has used params option instead of json,collect all the parameter in object
    if (contentType == 'CUSTOM') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    // Log all the values in the console for debugging 
    console.log('url is', url);
    console.log('requestType  is', requestType);
    console.log('contentType  is', contentType);
    console.log('your data is ', data);
    console.log('Your added Param Count is', addedParamCount);


    // now we invoked fetch-api here
    // if the requestType is GET ,we make post request through fetchApi
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((data) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('code').innerHTML = data;
                Prism.highlightAll();
                // simply highlight the json 
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded ',
            }
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('code').innerHTML = text;
                Prism.highlightAll();
            });
    }

});
// use prisim.js for stylind coding