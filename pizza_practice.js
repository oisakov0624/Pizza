function Pizza(city, speciality, toppings){
	this.city = city;
	this.speciality= speciality;
	this.toppings = toppings;
}
var toppings = [];
var selected = {};
var selectedToppings = [];
function Toppings(cheese, veggie, meat){
	this.cheese= cheese;
	this.veggie=veggie;
	this.meat=meat;
}
var nyToppings = new Toppings(["The saint", "Noble Romans"],["La Riccardo","Italian rome", "Mushroom"],["Artichoke", "Pepperoni"]);
var chToppings = new Toppings(["Coalfire","san ramon"],["Mista","Nivaka", "Mushroom"],["La Villa","Grape fruit", "Pepperoni"]);
var sfoToppings = new Toppings(["Italian pizza","Italiano"],["Spinach pizza", "Mushroom", "fresh hispanic"],["Stromboli pizza", "Pepperoni"]);

var franchiseNY = new Pizza("NewYork", ["NY-Cheese", "NY-Veggie", "NY-Meat"],nyToppings)
var franchiseCH = new Pizza("Chicago", ["CH-Cheese", "CH-Veggie", "CH-Meat"],chToppings)
var franchiseSFO = new Pizza("SFO", ["SFO-Cheese", "SFO-Veggie", "SFO-Meat"],sfoToppings)

$("#sp_pizza").on('change', function(){
	selectedToppings = [];
	var specialityType = $(this).val();
	selected.type = specialityType;
	speciality = specialityType.split("-")[1];
	if(speciality === "Cheese"){
		loadToppings("cheese");
	}else if(speciality === "Veggie"){
		loadToppings("veggie");
	}else{
		loadToppings("meat");
	}

});
$("body").on('click', ":checkbox", function(){
	selectedToppings.push($(this).val());
	updateConfirmation();
})
function loadToppings(type, specialityType){
	selectedToppings = [];
	var checkBoxes = "";
	var tops = toppings[type];
	var len = tops.length;
	for(var i = 0; i< len; i++){
		if(type == "veggie" && tops[i] == "Mushroom"){
			checkBoxes += ('<input type=checkbox value="'+tops[i]+'" checked>' +tops[i]);
			selectedToppings.push("Mushroom");
		}else if(type == "meat" && tops[i] == "Pepperoni"){
			checkBoxes += ('<input type=checkbox value="'+tops[i]+'" checked>' +tops[i]);
			selectedToppings.push("Pepperoni");
		}else{
			checkBoxes += ('<input type=checkbox value="'+tops[i]+'">' +tops[i]);
		}	
	}
	$("#checkContainer").html(checkBoxes);
	updateConfirmation();
}

function updateConfirmation(){
	var list = "",tops = "", selectedTopCnt = selectedToppings.length;
	for(prop in selected){
		list += ('<li> You have selected '+ selected[prop] +'</li>');
	}
	if(selectedTopCnt > 0){
		tops = tops + "<li> Toppings : ";
	}
	for(var i = 0; i < selectedTopCnt; i++){
		tops += selectedToppings[i] + "  ";
	}
	$("#confirmation ul").html(list  +tops+'</li>');
}
$("#franchise").on('change', function(){
	selectedToppings = [];
	$("#sp_pizza").show();
	var franchise = $(this).val();
	selected.franchise = franchise;

	if(franchise === "ny"){
		loadSpeciality(franchiseNY);

	}else if(franchise === "chicago"){
		loadSpeciality(franchiseCH);	 
	}else{
		loadSpeciality(franchiseSFO);
	}
	updateConfirmation();
})

function loadSpeciality(franchiseSelected){
	var options = "";
	toppings = franchiseSelected.toppings;
	for(var i=0; i < franchiseSelected.speciality.length; i++){
		options += '<option value="'+franchiseSelected.speciality[i]+'">'+franchiseSelected.speciality[i]+'</option>';
	}
	$("#sp_pizza").html(options);
}