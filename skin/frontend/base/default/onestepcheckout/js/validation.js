jQuery.noConflict();
function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}
function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}
function mdocumento(v) {
    v = v.replace(/\D/g, "");
    if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }
    return v;
}
function mdata(v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{2})(\d)/, "$1/$2")
    v = v.replace(/(\d{2})(\d)/, "$1/$2")
    return v
}
function mtel(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
}
function valor(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/[0-9]{15}/, "invÃ¡lido");
    v = v.replace(/(\d{1})(\d{11})$/, "$1.$2");
    v = v.replace(/(\d{1})(\d{8})$/, "$1.$2");
    v = v.replace(/(\d{1})(\d{5})$/, "$1.$2");
    v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2");
    return v;
}
function sonumeros(v) {
    v = v.replace(/\D/g, "");
    return v;
}
function checkMail(mail) {
    var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if (typeof (mail) == "string") {
        if (er.test(mail)) {
            return true;
        }
    } else if (typeof (mail) == "object") {
        if (er.test(mail.value)) {
            return true;
        }
    } 
     return false;
}
function PulaCampo(fields) {
    if (fields.value.length == fields.maxLength) {
        for (var i = 0; i < fields.form.length; i++) {
            if (fields.form[i] == fields && fields.form[(i + 1)] && fields.form[(i + 1)].type != "hidden") {
                fields.form[(i + 1)].focus();
                break;
            }
        }
    }
}
function validaCPF(cpf, pType) {
    var cpf_filtrado = "", valor_1 = " ", valor_2 = " ", ch = "";
    var valido = false;
    for (i = 0; i < cpf.length; i++) {
        ch = cpf.substring(i, i + 1);
        if (ch >= "0" && ch <= "9") {
            cpf_filtrado = cpf_filtrado.toString() + ch.toString()
            valor_1 = valor_2;
            valor_2 = ch;
        }
        if ((valor_1 != " ") && (!valido))
            valido = !(valor_1 == valor_2);
    }
    if (!valido)
        cpf_filtrado = "12345678912";
    if (cpf_filtrado.length < 11) {
        for (i = 1; i <= (11 - cpf_filtrado.length); i++) {
            cpf_filtrado = "0" + cpf_filtrado;
        }
    }
    if (pType <= 1) {
        if ((cpf_filtrado.substring(9, 11) == checkCPF(cpf_filtrado.substring(0, 9))) && (cpf_filtrado.substring(11, 12) == "")) {
            return true;
        }
    }
    if ((pType == 2) || (pType == 0)) {
        if (cpf_filtrado.length >= 14) {
            if (cpf_filtrado.substring(12, 14) == checkCNPJ(cpf_filtrado.substring(0, 12))) {
                return true;
            }
        }
    }
    return false;
}
function checkCNPJ(vCNPJ) {
    var mControle = "";
    var aTabCNPJ = new Array(5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
    for (i = 1; i <= 2; i++) {
        mSoma = 0;
        for (j = 0; j < vCNPJ.length; j++)
            mSoma = mSoma + (vCNPJ.substring(j, j + 1) * aTabCNPJ[j]);
        if (i == 2)
            mSoma = mSoma + (2 * mDigito);
        mDigito = (mSoma * 10) % 11;
        if (mDigito == 10)
            mDigito = 0;
        mControle1 = mControle;
        mControle = mDigito;
        aTabCNPJ = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3);
    }
    return((mControle1 * 10) + mControle);
}
function checkCPF(vCPF) {
    var mControle = ""
    var mContIni = 2, mContFim = 10, mDigito = 0;
    for (j = 1; j <= 2; j++) {
        mSoma = 0;
        for (i = mContIni; i <= mContFim; i++)
            mSoma = mSoma + (vCPF.substring((i - j - 1), (i - j)) * (mContFim + 1 + j - i));
        if (j == 2)
            mSoma = mSoma + (2 * mDigito);
        mDigito = (mSoma * 10) % 11;
        if (mDigito == 10)
            mDigito = 0;
        mControle1 = mControle;
        mControle = mDigito;
        mContIni = 3;
        mContFim = 11;
    }

    return((mControle1 * 10) + mControle);
}
//Busca de CEP na base dos correios por Ajax
var host,cep,obj,origem;
function buscaCep(host,origem) {
    console.log('Buscando CEP...');
	if(jQuery('select[name="'+origem+'country_id"]').val() == "BR" || jQuery('select[id="'+origem+'country_id"]').val() == "BR"){		
		cep = jQuery('input[id="'+origem+'postcode"]').val().replace(/[^0-9]+/g, '');
		if (cep.toString().length != 8) {
			return false;
		}
        loadposthideshow(true, '.onestepcheckout-postcod-process');
		jQuery.ajax({
			url: host + 'frontend/base/default/onestepcheckout/js/tulipa-checkout/buscacep.php?cep=' + cep,
			type:'GET',
			dataType: 'html',
        	timeout: 7000
		 })	
		.done(function(respostaCEP){
			obj = jQuery.parseJSON(respostaCEP);
			jQuery('input[id="'+origem+'street1"],input[id="street_1"]').val(obj.logradouro);
			jQuery('input[id="'+origem+'street4"],input[id="street_4"]').val(obj.bairro);
			jQuery('input[id="'+origem+'city"]').val(obj.cidade);
			jQuery('select[id="'+origem+'region_id"]').val(obj.codigo);
			jQuery('input[id="'+origem+'region"]').val(obj.codigo);
			jQuery('.msgcep').hide();
			jQuery('input[id="'+origem+'street2"]').focus();
			if(!obj.logradouro){
				jQuery('.msgcep').show();
			}            
		})
		.fail(function(){
			console.log('Falha!');
		})
		.always(function(){
            console.log(obj);
            loadposthideshow(false, '.onestepcheckout-postcod-process');
		});
	}
}
function loadposthideshow(show, classe, eq) {
    jQuery(document).ready(function ($) {
        if (show) {
            if (eq >= 0) {
                $(classe).eq(eq).show();
            } else {
                $(classe).show();
            }
        } else {
            $(classe).hide();
        }
    });
}