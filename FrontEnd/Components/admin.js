angular.module('app')
//we defined this varibals to be global for the others functions 
.controller('adminCtrl', function($scope, $http) {
   $scope.docInfo = {}
   $scope.reservedAppointments;
   $scope.change = false;
    // $scope.appointmentDate;
    // $scope.appointmentTime;
    // $scope.appointments;
    // $scope.counter = 0;
// it's for add new avalibal appointment 
$scope.addApointment = function() {
    $scope.appointmentDate = $('#addeddateappointment').val();
    $scope.appointmentTime = $('#addedtimeappointment').val();
            // for (var doctor=0 ; doctor < $scope.appointments.length ; doctor++){
            //  $scope.username = $scope.appointments[doctor].username;
            // }
            console.log('+++++++++>', $scope.appointmentDate);
            $.ajax({
                url: '/addAppointments',
                method: 'PUT',
                dataType: 'json',
                async: false,
                data: {
                    newAppointment: {
                        date: $scope.appointmentDate,
                        time: $scope.appointmentTime
                    }
                },
                success: function(data) {
                    console.log('apointment added  seccessfuly', data);
                }
            })
            $scope.getDocInfo()
        };
// it will print the reserved appointments from the database
$scope.loadAppointments = function() {
    console.log('loadAppointments run');
    $.ajax({
        url: '/getDoctorReservedAppointments',
        method: 'GET',
        dataType: 'json',
        async: false,
        success: function(data) {
           console.log('++++++++++++++', data);
           $scope.reservedAppointments = data;
           var x = $scope.reservedAppointments[0].patient
           console.log(x)
           $scope.reservedAppointments[0].patient = JSON.parse(x)
       }
   })
}

$scope.getDocInfo = function(){
    console.log("getting doctor")
    $.ajax({
        url: '/docInfo',
        method: 'GET',
        dataType: 'json',
        async: false,
        success: function(data) {
           console.log('++++++++++++++', data);
           $scope.docInfo = data[0]
       }
   })
}
$scope.init = function(){
    $scope.getDocInfo()
    $scope.loadAppointments()
}

$scope.recommendation = function(appointment){
    var letter = $("#recommendation").val()
    $.ajax({
        url: '/recomendation',
        method: 'POST',
        dataType: 'json',
        data: {
            recomendation: letter,
            appointment: appointment
        },
        success: () => {
            console.log('sent')
        }
    })
    $scope.loadAppointments()
}

$scope.deleteAppointment = (appointment) => {
    console.log('asdasdasdasd;as;kdmas;kdmja;sj', appointment)
    $.ajax({
        url: '/deleteAppointment',
        method: 'DELETE',
        dataType: 'json',
        data: {
            reservedAppointment: appointment
        },
        success: () => {
            console.log('hahahahahah')
        }
    })
    $scope.loadAppointments()
}

$scope.updateApp = function (appointment) {
    $scope.appointmentDate2 = $('#addeddateappointment2').val();
    $scope.appointmentTime2 = $('#addedtimeappointment2').val();
            // for (var doctor=0 ; doctor < $scope.appointments.length ; doctor++){
            //  $scope.username = $scope.appointments[doctor].username;
            // }
            console.log('+++++++++>', $scope.appointmentDate);
            $.ajax({
                url: '/changeAppointment',
                method: 'PUT',
                dataType: 'json',
                async: false,
                data: {
                    appointment: appointment,
                    time: $scope.appointmentTime2 + " " + $scope.appointmentDate2
                },
                success: function(data) {
                    console.log('apointment added  seccessfuly', data);
                }
            })
            $scope.loadAppointments()
        };


        $scope.deleteOpenAppointment = (appointment) => {
            console.log('asdasdasdasd;as;kdmas;kdmja;sj', appointment)
            $.ajax({
                url: '/deleteOpenAppointment',
                method: 'DELETE',
                dataType: 'json',
                data: {
                    reservedAppointment: appointment
                },
                success: () => {
                    console.log('hahahahahah')
                }
            })
            $scope.getDocInfo()
        }
    })
    .component('admin', {
        controller: "adminCtrl",
        templateUrl: `./views/admin.html`
})