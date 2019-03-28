// Initialize Firebase
var config = {
    apiKey: "AIzaSyBL3w8lw6RhINBxlxxDhmmlWPVaQFLp7BA",
    authDomain: "trainscheduler-bb469.firebaseapp.com",
    databaseURL: "https://trainscheduler-bb469.firebaseio.com",
    projectId: "trainscheduler-bb469",
    storageBucket: "trainscheduler-bb469.appspot.com",
    messagingSenderId: "720888387607"
};
firebase.initializeApp(config);
var database = firebase.database();

$("#submitbutton").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#input1").val().trim();
    var destination = $("#input2").val().trim();
    var firstTrainTime = $("#input3").val().trim();
    var frequency = $("#input4").val().trim();

    var timeData = {
        name: trainName,
        dest: destination,
        firstTime: firstTrainTime,
        freq: frequency
    }
    database.ref().push(timeData);

    alert("Train schedule successfully added");

    $("#input1").val("");
    $("#input2").val("");
    $("#input3").val("");
    $("#input4").val("");
})

database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrainTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().freq;

    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
        $("<td>").text(tMinutesTillTrain),
    );

    $("#tableBody").append(newRow);
})