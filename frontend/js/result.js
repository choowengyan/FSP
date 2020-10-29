const basicResultQuery = {
    facultyId: null,
    semesterId: null,
    dayOfWeek: null
};

//for localhost 
const basicResultUrl = 'http://localhost:3000/basic/result'

//for hosting 
// const host = 'https://monkeys-2a14.herokuapp.com'
// const basicResultUrl = host + '/basic/result' ;

function populateBasicResultTable(result) {
    console.log(result);

    let earliestStartTime = "2359";
    let latestEndTime = "0000";

    var result = result.result;
    if (result.length == 0) {
        window.alert("No Records Found. Please enter valid data.");
        location.reload();
    } else {
        var times = Object.values(result)
            .map(lectures => ({
                earliestStartTime: lectures.map(x => x.startTime).reduce((x, y) => x < y ? x : y),
                latestEndTime: lectures.map(x => x.endTime).reduce((x, y) => x > y ? x : y)
            }));


        for (let i = 0; i < Object.keys(result).length; i++) {
            for (let j = 0; j < result[i].length; j++) {

                currentEarliestStartTime = times[i].earliestStartTime
                if (currentEarliestStartTime < earliestStartTime) {
                    earliestStartTime = currentEarliestStartTime;
                }
                currentLatestEndTime = times[i].latestEndTime
                if (currentLatestEndTime > latestEndTime) {
                    latestEndTime = currentLatestEndTime;
                }
            }
        }

        let row = `
    <div class = 'row' style = 'line-height: 50px; font-weight: bold;'>
    <div class = 'hall' style= 'width: 50px; text-align: center; background-color: black; color: white;'> Hall </div> 
   `
        earliestStartTime = "0800" ;
        latestEndTime = "1800";

        for (let time = parseInt(earliestStartTime); time < parseInt(latestEndTime); time += 100) {
            //1 minute = 1.8px
            row +=
                `
        <div class = 'cell' style = 'width:105.5px; display: inline-block; text-align: center; border: 1px solid black; background-color: black; color: white;'> ${time} - ${time + 100} </div>
        `
        }
        row += `</div>`

        for (let i = 0; i < Object.keys(result).length; i++) {
            row += `
    <div class = 'row' style = 'line-height: 50px;'>
    <div class = 'hall' style='width: 50px; border-right: 1px solid black; text-align:center; font-weight: bold;'> Hall ${i + 1} </div> 
    `
            var prevEndTime = earliestStartTime;
            for (let j = 0; j < result[i].length; j++) {
                console.log("lecture1", result[i]);
                const lecture = result[i][j];
                console.log("lecture2", lecture);

                if (j != 0) {
                    lectureprev = result[i][j - 1];
                    prevEndTime = lectureprev.endTime;
                }

                console.log("prev", prevEndTime);

                console.log("lecture", lecture);
                const lectureId = lecture.lectureId;

                var startTime = lecture.startTime;
                var startTimeMin1 = startTime.slice(0, 2);
                var startTimeMin2 = startTime.slice(2, 4);
                startTime = parseInt(startTimeMin1 * 60) + parseInt(startTimeMin2);

                var endTime = lecture.endTime;
                var endTimeMin1 = endTime.slice(0, 2);
                var endTimeMin2 = endTime.slice(2, 4);
                endTime = parseInt(endTimeMin1 * 60) + parseInt(endTimeMin2)

                var prevEndTimeMin1 = prevEndTime.slice(0, 2);
                var prevEndTimeMin2 = prevEndTime.slice(2, 4);
                prevEndTime = parseInt(prevEndTimeMin1 * 60) + parseInt(prevEndTimeMin2);

                const width = (endTime - startTime) * 1.55;
                console.log("test", startTime, endTime, prevEndTime);
                const marginLeft = (startTime - prevEndTime) * 1.8;
                console.log("marginLeft", marginLeft);
                console.log("width", width);
                row += `
    <div class = 'cell' style = 'width:${width}px; margin-left: ${marginLeft}px; text-align: center; border-left: 1px solid black; border-right: 1px solid black; background-color: whitesmoke'> ${lectureId} </div>
    `
            }
            row += `</div>`
        }
        console.log(row);
        $('#lectureTimetable').html(row);
    }
};

function getBasicResultFromBackend(callback) {
    $.get(basicResultUrl, basicResultQuery)
        .done((result) => callback(null, result))
        .fail((message) => callback(message, null));
};

function refreshBasicResultTable() {
    getBasicResultFromBackend(function (error, result) {
        if (error) return alert(error);
        populateBasicResultTable(result);
    });
};

function filterResultData(event) {
    $('#basic-result-filter-form input')
        .not(':input[type=submit]')
        .each((idx, input) => {
            // console.log(idx,input);   //for checking purpose 
            basicResultQuery[$(input).attr('key')] = $(input).val();
        });
    //console.log(basicResultQuery);    //for checking purpose
    //for checking purpose  
    // console.log(event);
    // console.log(this); //shows the form 
    validateSubmitButton();
    return false;
};

//validation for filter form
function validateSubmitButton() {
    getBasicResultFromBackend(function (error, result) {
        if (error) return alert(error);
        if (result.code == 422) {
            window.alert("Please fill in all the required fields.");
            location.reload();
        };
        populateBasicResultTable(result);
    });
};

function registerBasicResultFilterForm() {
    $('#basic-result-filter-form').submit(filterResultData);
};


$(document).ready(function () {
    registerBasicResultFilterForm();
    refreshBasicResultTable();
});

