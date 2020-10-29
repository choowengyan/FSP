
//filtering 
const advanceResultQuery = {
    facultyId: null,
    semesterId: null,
    dayOfWeek: null,
};

//for localhost 
const advanceResultUrl = 'http://localhost:3000/advance/result'

//for hosting 
// const host = 'https://monkeys-2a14.herokuapp.com'
// const advanceResultUrl = host + '/advance/result' ;

function populateAdvanceResultTable(result) {
    var result = result.result;
    console.log(result);
    //No records 
    if (result.length==0){
        window.alert("No Records Found");
        location.reload();
    }
    const resultTableHtml = result.map(
        ({ startTime, endTime, surplus }) => `
            <tr>
                <td>${startTime}</td>
                <td>${endTime}</td>
                <td>${surplus}</td>
            </tr>   
            `,
    );
    $('#advance-result-tbody').html(resultTableHtml);
};

function getAdvanceResultFromBackend(callback) {
    $.get(advanceResultUrl, advanceResultQuery)
        .done((result) => callback(null, result))
        .fail((message) => callback(message, null));
};

function refreshAdvanceResultTable() {
    getAdvanceResultFromBackend(function (error, result) {
        if (error) return alert(error);
        populateAdvanceResultTable(result);
    });
};

function filterAdvanceResult(event) {
    $('#advance-result-filter-form input')
        .not(':input[type=submit]')
        .each((idx, input) => {
            // console.log(idx,input);   //for checking purpose 
            advanceResultQuery[$(input).attr('key')] = $(input).val();
        });
        //Not all fields are filled 
        if( advanceResultQuery.facultyId=="" || advanceResultQuery.semesterId=="" || advanceResultQuery.dayOfWeek == ""){
            window.alert("Please fill in all the required fields.");
            location.reload();
        }
    //console.log(advanceResultQuery);    //for checking purpose
    //for checking purpose  
    // console.log(event);
    // console.log(this); //shows the form 
    validateSubmitButton();
    return false;
};

//validation for filter form
function validateSubmitButton() {
    getAdvanceResultFromBackend(function (error, result) {
        if (error) return alert(error);
        if (result.code == 404) {
            window.alert("No records found. Please enter valid data.");
            location.reload();
        };
        populateAdvanceResultTable(result);
    });
};

function registerAdvanceResultFilterForm() {
    $('#advance-result-filter-form').submit(filterAdvanceResult);
};

function paginateAdvanceResult(event) {
    const fn = $(this).attr('fn');
    const value = $(this).attr('value') || $(this).val();
    advanceResultPaginationFunction[fn](value);
    refreshAdvanceResultTable();
    console.log(advanceResultQuery);
};

function registerAdvanceResultPaginationForm() {
    $('#advance-result-next-page').click(paginateAdvanceResult);
    $('#advance-result-first-page').click(paginateAdvanceResult);
    $('#advance-result-previous-page').click(paginateAdvanceResult);
    $('#advance-result-page-size-select').change(paginateAdvanceResult);
};

$(document).ready(function () {
    registerAdvanceResultFilterForm();
    registerAdvanceResultPaginationForm();
    refreshAdvanceResultTable();
});

