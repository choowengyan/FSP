//filtering 
const basicDataQuery = {
    facultyId: null,
    semesterId: null,
    page: 0,
    pageSize: 5
};

const basicDataPaginationFunction = {
    gotoFirstPage: function () {
        basicDataQuery['page'] = 0;
        buttonVisibility();
    },
    changePage: function (delta) {
        basicDataQuery['page'] += parseInt(delta);
        if (basicDataQuery['page'] < 0) {
            basicDataQuery['page'] = 0;
            window.alert("This is the first page");
        };
        buttonVisibility();
    },
    changePageSize: function (newPageSize) {
        // console.log(newPageSize);  //checking purpose
        basicDataQuery['pageSize'] = newPageSize;
        buttonVisibility();
        refreshBasicDataTable();
    }
};

// hide or show "NEXT" button 
function buttonVisibility() {
    getBasicDataFromBackend(function (error, data) {
        if (error) return alert(error);
        //console.log(data.length); //checking purpose
        if (data['length'] < basicDataQuery['pageSize']) {
            document.getElementById("basic-data-next-page").style.visibility = "hidden";
        } else {
            document.getElementById("basic-data-next-page").style.visibility = "visible";
        }
    });
};

//for localhost
const basicDataUrl = 'http://localhost:3000/basic/data'

//for hosting 
// const host = 'https://monkeys-2a14.herokuapp.com'
// const basicDataUrl = host + '/basic/data' ;

function populateBasicDataTable(data) {
    console.log(data);
    const dataTableHtml = data.map(
        ({ lectureid, semesterid, facultyid, dayofweek, starttime, endtime }) => `
            <tr>
                <th scope="row">${lectureid}</th>
                <td>${semesterid}</td>
                <td>${facultyid}</td>
                <td>${dayofweek}</td>
                <td>${starttime}</td>
                <td>${endtime}</td>
            </tr>   
            `,
    );
    $('#basic-data-tbody').html(dataTableHtml);
};

function getBasicDataFromBackend(callback) {
    $.get(basicDataUrl, basicDataQuery)
        .done((result) => callback(null, result))
        .fail((message) => callback(message, null));
};

function refreshBasicDataTable() {
    getBasicDataFromBackend(function (error, data) {
        if (error) return alert(error);
        populateBasicDataTable(data)
    });
};

function filterBasicData(event) {
    $('#basic-data-filter-form input')
        .not(':input[type=submit]')
        .each((idx, input) => {
            // console.log(idx,input);   //for checking purpose 
            basicDataQuery[$(input).attr('key')] = $(input).val();
        });
    // console.log(basicDataQuery);    //for checking purpose
    //for checking purpose  
    // console.log(event);
    // console.log(this); //shows the form 
    validateSubmitButton();
    buttonVisibility();
    return false;
};

//validation for filter form
function validateSubmitButton() {
    getBasicDataFromBackend(function (error, data) {
        if (error) return alert(error);
        if (data.code == 404) {
            window.alert("No records found");
            location.reload();
        };
        populateBasicDataTable(data);
    });
};

function registerBasicDataFilterForm() {
    $('#basic-data-filter-form').submit(filterBasicData);
};

function paginateBasicData(event) {
    const fn = $(this).attr('fn');
    const value = $(this).attr('value') || $(this).val();
    basicDataPaginationFunction[fn](value);
    refreshBasicDataTable();
    console.log(basicDataQuery);
};

function registerBasicDataPaginationForm() {
    $('#basic-data-next-page').click(paginateBasicData);
    $('#basic-data-first-page').click(paginateBasicData);
    $('#basic-data-previous-page').click(paginateBasicData);
    $('#basic-data-page-size-select').change(paginateBasicData);
};

$(document).ready(function () {
    registerBasicDataFilterForm();
    registerBasicDataPaginationForm();
    refreshBasicDataTable();
});

