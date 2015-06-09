<?php
//INCUI A CLASSE PHPQUERY
//(http://code.google.com/p/phpquery)
include('phpQuery-onefile.php');
//MONTA O CURL
function simple_curl($url,$post=array(),$get=array()){
	$url = explode('?',$url,2);
	if(count($url)===2){
		$temp_get = array();
		parse_str($url[1],$temp_get);
		$get = array_merge($get,$temp_get);
	}
	$ch = curl_init($url[0]."?".http_build_query($get));
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt ($ch, CURLOPT_POST, 0);
	curl_setopt ($ch, CURLOPT_POSTFIELDS, http_build_query($post));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	return curl_exec ($ch);
}
//MONTA URL A SER EXPLORADA
$cep = $_GET['cep'];
	$html = simple_curl('http://m.correios.com.br/movel/buscaCepConfirma.do',array(
	'cepEntrada'=>$cep,
	'tipoCep'=>'',
	'cepTemp'=>'',
	'metodo'=>'buscarCep'
));
//INICIA O PHPQUERY
phpQuery::newDocumentHTML($html, $charset = 'utf-8');
//CAPTURA ATRAVES DO PHPQUERY OS RESULTADOS
$dados =
  array(
  	'logradouro'=> trim(pq('.caixacampobranco .resposta:contains("Logradouro: ") + .respostadestaque:eq(0)')->html()),
  	'bairro'=> trim(pq('.caixacampobranco .resposta:contains("Bairro: ") + .respostadestaque:eq(0)')->html()),
  	'cidade/uf'=> trim(pq('.caixacampobranco .resposta:contains("Localidade / UF: ") + .respostadestaque:eq(0)')->html()),
  	'cep'=> trim(pq('.caixacampobranco .resposta:contains("CEP: ") + .respostadestaque:eq(0)')->html())
  );
//SEPARA A CIDADE DA UF DO RESULTADO ACIMA
  $dados['cidade/uf'] = explode('/',$dados['cidade/uf']);
  $dados['cidade'] = trim($dados['cidade/uf'][0]);
  $dados['uf'] = trim($dados['cidade/uf'][1]);
  unset($dados['cidade/uf']);
//REMOVE OUTRAS INFORMAÇÕES QUE VEM JUNTO AO LOGADOURO EXE:
//LADO DA RUA COMO PODE SER VISTO NESSE LINK
//(http://m.correios.com.br/movel/buscaCepConfirma.do?cepEntrada=21061020&metodo=buscarCep)
  $logradouro = explode('-',$dados['logradouro']);
  $dados['logradouro'] = trim($logradouro[0]);
  unset($logradouro);
if ( isset($dados) ) {
//MONTA SWITC PARA SELECIONAR NO COMBO DO MAGENTO
        switch ( $dados['uf'] ){
            case "AC": $uf = 'Acre';               $estado = 1;  $num = 485; break;
            case "AL": $uf = 'Alagoas';            $estado = 2;  $num = 486; break;
            case "AP": $uf = 'Amapa';              $estado = 3;  $num = 487; break;
            case "AM": $uf = 'Amazonas';           $estado = 4;  $num = 488; break;
            case "BA": $uf = 'Bahia';              $estado = 5;  $num = 489; break;
            case "CE": $uf = 'Ceara';              $estado = 6;  $num = 490; break;
            case "ES": $uf = 'Espirito Santo';     $estado = 8;  $num = 491; break;
            case "GO": $uf = 'Goias';              $estado = 9;  $num = 492; break;
            case "MA": $uf = 'Maranhao';           $estado = 10; $num = 493; break;
            case "MT": $uf = 'Mato Grosso';        $estado = 12; $num = 494; break;
            case "MS": $uf = 'Mato Grosso do Sul'; $estado = 12; $num = 495; break;
            case "MG": $uf = 'Minas Gerais';       $estado = 13; $num = 496; break;
            case "PA": $uf = 'Para';               $estado = 14; $num = 497; break;
            case "PB": $uf = 'Paraiba';            $estado = 15; $num = 498; break;
            case "PR": $uf = 'Parana';             $estado = 16; $num = 499; break;
            case "PE": $uf = 'Pernambuco';         $estado = 17; $num = 500; break;
            case "PI": $uf = 'Piaui';              $estado = 18; $num = 501; break;
            case "RJ": $uf = 'Rio de Janeiro';     $estado = 19; $num = 502; break;
            case "RN": $uf = 'Rio Grande do Norte';$estado = 20; $num = 503; break;
            case "RS": $uf = 'Rio Grande do Sul';  $estado = 21; $num = 504; break;
            case "RO": $uf = 'Rondonia';           $estado = 22; $num = 505; break;
            case "RR": $uf = 'Roraima';            $estado = 23; $num = 506; break;
            case "SC": $uf = 'Santa Catarina';     $estado = 24; $num = 507; break;
            case "SP": $uf = 'Sao Paulo';          $estado = 25; $num = 508; break;
            case "SE": $uf = 'Sergipe';            $estado = 26; $num = 509; break;
            case "TO": $uf = 'Tocantins';          $estado = 27; $num = 510; break;
            case "DF": $uf = 'Distrito Federal';   $estado = 7;  $num = 511; break;
        }
            $dados['codigo'] = $num;
            $dados['indice'] = $estado;
            $dados['uf_extenso'] = $uf;
        echo json_encode($dados);

}else {
        $texto = false;
        echo $texto;
};
?>
