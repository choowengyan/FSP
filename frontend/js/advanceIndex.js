
//filtering 
const advanceDataQuery = {
    facultyId: null,
    semesterId: null,
    dayOfWeek: null,
    page: 0,
    pageSize: 5
};

const advanceDataPaginationFunction = {
    gotoFirstPage: function () {
        advanceDataQuery['page'] = 0;
        buttonVisibility();
    },
    changePage: function (delta) {
        advanceDataQuery['page'] += parseInt(delta);
        if (advanceDataQuery['page'] < 0) {
            advanceDataQuery['page'] = 0;
            window.alert("This is the first page");
        };
        buttonVisibility();
    },
    changePageSize: function (newPageSize) {
        // console.log(newPageSize);  //checking purpose
        advanceDataQuery['pageSize'] = newPageSize;
        buttonVisibility();
        refreshAdvanceDataTable();
    }
};

// hide or show "NEXT" button 
function buttonVisibility() {
    getAdvanceDataFromBackend(function (error, data) {
        if (error) return alert(error);
        //console.log(data.length); //checking purpose
        if (data['length'] < advanceDataQuery['pageSize']) {
            document.getElementById("advance-data-next-page").style.visibility = "hidden";
        } else {
            document.getElementById("advance-data-next-page").style.visibility = "visible";
        }
    });
};

//for localhost 
const advanceDataUrl = 'http://localhost:3000/advance/data'

//for hosting 
// const host = 'https://monkeys-2a14.herokuapp.com'
// const advanceDataUrl = host + '/advance/data'; 

function populateAdvanceDataTable(data) {
    console.log(data);
    const dataTableHtml = data.map(
        ({ technicianid, semesterid, facultyid, dayofweek, starttime, endtime }) => `
            <tr>
                <th scope="row">${technicianid}</th>
                <td>${semesterid}</td>
                <td>${facultyid}</td>
                <td>${dayofweek}</td>
                <td>${starttime}</td>
                <td>${endtime}</td>
            </tr>   
            `,
    );
    $('#advance-data-tbody').html(dataTableHtml);
};

function getAdvanceDataFromBackend(callback) {
    $.get(advanceDataUrl, advanceDataQuery)
        .done((result) => callback(null, result))
        .fail((message) => callback(message, null));
};

function refreshAdvanceDataTable() {
    getAdvanceDataFromBackend(function (error, data) {
        if (error) return alert(error);
        populateAdvanceDataTable(data)
    });
};

function filterAdvanceData(event) {
    $('#advance-data-filter-form input')
        .not(':input[type=submit]')
        .each((idx, input) => {
            // console.log(idx,input);   //for checking purpose 
            advanceDataQuery[$(input).attr('key')] = $(input).val();
        });
    // console.log(advanceDataQuery);    //for checking purpose
    //for checking purpose  
    // console.log(event);
    // console.log(this); //shows the form 
    validateSubmitButton();
    buttonVisibility();
    return false;
};

//validation for filter form
function validateSubmitButton() {
    getAdvanceDataFromBackend(function (error, data) {
        if (error) return alert(error);
        if (data.code == 404) {
            window.alert("No records found");
            location.reload();
        };
        populateAdvanceDataTable(data);
    });
};

function registerAdvanceDataFilterForm() {
    $('#advance-data-filter-form').submit(filterAdvanceData);
};

function paginateAdvanceData(event) {
    const fn = $(this).attr('fn');
    const value = $(this).attr('value') || $(this).val();
    advanceDataPaginationFunction[fn](value);
    refreshAdvanceDataTable();
    console.log(advanceDataQuery);
};

function registerAdvanceDataPaginationForm() {
    $('#advance-data-next-page').click(paginateAdvanceData);
    $('#advance-data-first-page').click(paginateAdvanceData);
    $('#advance-data-previous-page').click(paginateAdvanceData);
    $('#advance-data-page-size-select').change(paginateAdvanceData);
};

$(document).ready(function () {
    registerAdvanceDataFilterForm();
    registerAdvanceDataPaginationForm();
    refreshAdvanceDataTable();
});

