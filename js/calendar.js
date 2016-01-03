$(document).ready(function(){
	$('#calendar').fullCalendar({
		googleCalendarApiKey: 'AIzaSyDHbpmv-MLXrFUe87g9XFzFkfvFwD70JJw',
		firstDay:1,
		height:"auto",
		titleFormat:'MMMM, YYYY',
		customButtons: {
        customButtonYear: {
            text: 'Year',
            click: function() {
            	$(this).addClass('fc-state-active');
            	$('button.fc-month-button').removeClass('fc-state-active');
                alert('clicked button Year');
            }
        }
    },		
		buttonText:{
			 today:    'today',
    			month:    'Month',
    			week:     'week',
    			day:      'day'
		},
		header: {
        left: 'prev title next ',
        center: '',
        right: 'month customButtonYear'
    	},
    	buttonIcons:{

		    prev: 'fa fa-angle-left',
		    next: 'fa fa-angle-right',		    
		},		 
	});
	var moment = $('#calendar').fullCalendar('getDate');
    $('span#getCurrent').html( moment.format('dddd, MMMM DD'));
    $('.fc-widget-header table th').filter(function() {
    return $(this).text() == moment.format('ddd');}).css('color', '#ff4d6f');
	var $fcButtons = $('[class*="fc-icon"]').addClass('fa');
});