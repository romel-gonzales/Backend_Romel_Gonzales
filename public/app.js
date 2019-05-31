$(document).ready(function() {

    $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: 1000,
        to: 20000,
        prefix: "$"
    });
	
    function init(){
        $.ajax({
            url: 'http://localhost:3000/seleccionListado',
            type: 'get',
            dataType: 'json'
        })
        .done(function(data) {
            if (!data.error) {
                console.log(data);
                $('#ciudad').append(renderizarResultado(data.ciudades));
                $('#tipo').append(renderizarResultado(data.tipos));
                $("#ciudad").material_select();
                $("#tipo").material_select();
            }
        });
    }	
	
    init();
    setSearch();
	
    function setSearch() {
        let busqueda = $('#checkPersonalizada');
        busqueda.on('change', (e) => {
            this.customSearch = !this.customSearch;
            $('#personalizada').toggleClass('invisible');
        });
    }	

    function renderizarResultado(data) { 
        var html = '';
        data.forEach(function(key, idx) {
            html += `<option value="${key}">${key}</option>`;
        });
        return html;
    }	

    $('#buscar').click(function() {
        if ($("#checkPersonalizada")[0].checked){
            var valores = $("#rangoPrecio").val();
            valores = valores.split(";");
            var urls = `http://localhost:3000/ciudad/${$("#ciudad").val()}/tipo/${$("#tipo").val()}/desde/${valores[0]}/hasta/${valores[1]}`;
        } else {
            var urls = "http://localhost:3000/busqueda";
        }
        $.ajax({
            url: urls,
            type: 'get',
            dataType: 'json'
          })
            .done(function(data){
                if (!data.error) {
                    // console.log(data);
                    $('.lista').html(rellenarResultado(data.datos));
                }
            });
    });

    function rellenarResultado(objArr) {
        var html = '';
        
        objArr.forEach(function(key, idx)
        {
            html += `<div class="card horizontal">
                    <div class="card-image">
                        <img src="http://localhost:3000/img/home.jpg">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <div> <p><strong>Direccion: </strong>${ key.Direccion }</p> </div>
                            <div> <p><strong>Ciudad: </strong>${ key.Ciudad }</p> </div>
                            <div> <p><strong>Telefono: </strong>${ key.Telefono }</p> </div>
                            <div> <p><strong>Código postal: </strong>${ key.Codigo_Postal }</p> </div>
                            <div> <p><strong>Precio: </strong>${ key.Precio }</p> </div>
                            <div> <p><strong>Tipo: </strong>${ key.Tipo }</p> </div>
                        </div>
                    </div>
                </div>`;
        });
        return html;
    } 
});
