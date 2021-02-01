$(document).ready(function(){
    var cenaKg;
    var pocetKg;
    var zakladni;
    var vysledna;
    $("#kg").val("0");
    $("#kUtrate").val("0");
    $("#osobne").prop("checked", true);
    zapisCeny();

    function spocitejZakladniCenu(){
        pocetKg=parseInt($("#kg").val());
        cenaKg=parseInt($("#krmivo").val());
        return pocetKg * cenaKg;
    }

    function spocitejVyslednouCenu(zakladni){
        vysledna = zakladni;
        if ($("#bio").prop("checked"))
            vysledna += zakladni * 0.3;
        if ($("#premium").prop("checked"))
            vysledna += zakladni * 0.5;
        if ($("#nekvalita").prop("checked"))
            vysledna -= zakladni * 0.15;
        if ($("#darek").prop("checked"))
            vysledna += 500;
        if ($("#kuryr").prop("checked"))
            vysledna += vysledna * 0.1;
        if ($("#posta").prop("checked"))
            vysledna += 250;
        return vysledna;
    }

    function zapisCeny() {
        zakladni = spocitejZakladniCenu();
        $("#zakladni").val(zakladni);
        $("#celkem").val(spocitejVyslednouCenu(zakladni));
    }

    $("#krmivo").change(zapisCeny);
    $('#kg').keyup(zapisCeny);

    $("#bio").click(zapisCeny);
    $("#premium").click(zapisCeny);
    $("#nekvalita").click(zapisCeny);
    $("#darek").click(zapisCeny);

    $("#osobne").click(zapisCeny);
    $("#kuryr").click(zapisCeny);
    $("#posta").click(zapisCeny);

    $("#spocitej").click(function(){
        var utrata = parseInt($("#kUtrate").val());
        if (vysledna == "0" || vysledna == "") {
            alert("Nemáte vybráno");
            return;
        }
	    if (utrata == 0 || utrata == "") {
		    alert ("Nezadali jste čásku k úhradě");
	        return;
        }
        if (vysledna <= utrata)
            $("#vyjde").html("<b>Můžete si nákup dovolit.</b>");
        else
            $("#vyjde").html("<b>Nákup si bohužel nemůžete dovolit.</b>");
    })

    var charCodeZero = "0".charCodeAt(0);
    var charCodeNine = "9".charCodeAt(0);
    var charCodea = "a".charCodeAt(0);
    var charCodez = "z".charCodeAt(0);
    var charCodeA = "A".charCodeAt(0);
    var charCodeZ = "Z".charCodeAt(0);

    function check_numbers(value) {
	    /*c = evalu.charCodeAt(value.length - 1);*/
	    return (value >= charCodeZero && value <= charCodeNine);
    }

    function check_letters(value) {
	    /*c = value.charCodeAt(value.length - 1);*/
	    return ((value >= charCodeA && value <= charCodeZ) || (value >= charCodea && value <= charCodez))
    }

    $("#email").keypress(function(event) {
	    val = event.keyCode;                          /*=$("#email").val();*/
        console.log(val);
	    result = check_letters(val) || check_numbers(val);
	
	    if (!result) {
		    /*$("#email").val($("#email").val().substring(0, val.length - 1));*/
            event.preventDefault();
	    }
    })
});


/*kontrola nepovolených znaků*/

/* VARIANTA 2 - regulární výraz
function kontrola(char) {
	var regex = /^[A-Za-z0-9 ]+$/;
    var isValid = regex.test(document.getElementById("email").value);
    if (!isValid) {
		char.value = char.value.substring(0, char.value.length - 1);
	}
    return isValid;
}*/

/*VARIANTA 3
function kontrola()			/*volání bez parametrů, keypress
    {
      with (event)
      {
        c1=(keyCode>32 && keyCode<48);
        c2=(keyCode>57 && keyCode<65);
        c3=(keyCode>90 && keyCode<97);
        c4=(keyCode>122 && keyCode<127);
        if (c1 || c2 || c3 || c4) returnValue=false;
	  }
    }*/