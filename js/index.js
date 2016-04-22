$(function(){
	var inputKey = $("#keys");
	var gridCollection = new GridCollection(grids);
	var gridLinks = $('input[type=radio][name=gridLinks]');
	var currentGridIndex;
	var currentGrid;
	
	$(".gridLinks").append(gridCollection.GetGridLinksHTML());
	
	function SelectGrid(index) {
		currentGridIndex = index;				
		currentGrid = gridCollection.GetGrid(currentGridIndex);
		$("#grid").html(currentGrid.GetGridHTML());
		ClearInput();
		FocusInput();
		$(".result").html("");
	}
	
	$('input[type=radio][name=gridLinks]').change(function() { 
		SelectGrid($(this).val());
	});

	$("#shoot").click(function() { 					
		
		var keys = inputKey.val().toUpperCase();
		var result = currentGrid.GetValues(keys);
		result = "[" + keys + "] = " + result;
		$(".result").text(result);
		
		Reset();
	});
	
	inputKey.blur(function(event){
		
		var key = event.which || event.keyCode || event.charCode;
		if(key == 8 || key == 46) return;
		
		var inputVal = inputKey.val().replace(",","");
		
		if(inputVal) {
			
			inputKey.val(inputVal.match(/.{1,2}/g).join(","));
			$("#shoot").click();
		}				
	});
	
	function FocusInput(){
		inputKey.focus();
	}
	
	function ClearInput(){
		inputKey.val("");
	}
	
	function SelectLink(value) {
		$("input[name='gridLinks'][value='" + value + "']").attr('checked', true);
	}
	
	SelectLink(0);
	SelectGrid(0);
	
	function Reset(){

		ClearInput();
		FocusInput();	
	}
});