
window.kode = '<tr><td><input type="text" class="matkul"></td><td><input type="number" class="sks input-small" value="0"></td><td><input type="number" class="presensi input-small" value="0"></td><td><input type="number" class="tugas input-small" value="0"></td><td><input type="number" class="uts input-small" value="0"></td><td><input type="number" class="uas input-small" value="0"></td><td class="grade"></td><td><button class="btn btn-danger tombolhapus"><i class="icon-remove icon-white"></i></button></td></tr>';

function tambahkan(){
	$('table#nilai tbody').append(kode);
}

function ValidNIM() {
	var A = document.getElementById("nim").value;
	if (isNaN(A))
		alert("Hanya Angka");
}

function hitungipk(){
	var total_matkul = $('table#nilai tbody tr').length;
	var total_sks = 0;
	var total_nilai = 0;
	var nama = $('#nama').val();
	var nim = $('#nim').val();
	
	if (nama.trim().length == 0 || nim.trim().length == 0) {
		alert('nim dan nama harus diisi');
		return;
	}
	
	$('#result').hide();
	
	$('table#nilai tbody tr').each(function(){
		var sks = parseInt($(this).find('.sks').val());
		var grade = $(this).find('.grade').text();
		
		total_sks += sks;
		
		if (grade == 'A') total_nilai += (sks * 4);
		else if (grade == 'B') total_nilai += (sks * 3);
		else if (grade == 'C') total_nilai += (sks * 2);
		else if (grade == 'D') total_nilai += (sks * 1);
		else total_nilai += (sks * 0);
	});
	
	var ipk = total_nilai / total_sks;
	
	$('#loading .bar').animate({width:'100%'}, 500);
	setTimeout(function(){
		$('#result_nim').html(nim);
		$('#result_nama').html(nama);
		$('#result_sks').html(total_sks);
		$('#result_matkul').html(total_matkul);
		$('#result_ipk').html(ipk.toFixed(2));
		$('#result').fadeIn('slow');
	}, 1500);
	setTimeout(function(){
		$('#loading .bar').animate({width:'0%'}, 500);
	}, 2500);
}

function reset(){
	$('table#nilai tbody tr').remove();
	$('table#nilai tbody').append(kode);
	$('#nama, #nim').val('');
	$('#result').hide();
}

$(document).ready(function(){

	$('.container-fluid').hide().fadeIn('slow');
	
	$('table#nilai').delegate('.sks, .presensi, .tugas, .uts, .uas', 'keydown keyup change focus', function(e){
		
		var sks = parseInt($(this).closest('tr').find('.sks').val());
		var presensi = 0.1 * parseInt($(this).closest('tr').find('.presensi').val());
		var tugas = 0.2 * parseInt($(this).closest('tr').find('.tugas').val());
		var uts = 0.3 * parseInt($(this).closest('tr').find('.uts').val());
		var uas = 0.4 * parseInt($(this).closest('tr').find('.uas').val());
		
		var nilai = presensi + tugas + uts + uas;
		var grade = $(this).closest('tr').find('.grade');
		
		if (nilai >= 85) grade.html('A');
		else if (nilai >= 75) grade.html('B');
		else if (nilai >= 60) grade.html('C');
		else if (nilai >= 35) grade.html('D');
		else grade.html('E');
		
	}).delegate('.tombolhapus', 'click', function(){
		if (confirm('Anda yakin akan menghapusnya?')) $(this).closest('tr').slideUp('slow').remove();
		
	});
	
	$('.sks, .presensi, .tugas, .uts, .uas').focus(function() {
		var $this = $(this);
		$this.select();

		$this.mouseup(function() {
			$this.unbind("mouseup");
			return false;
		});
	});
	
});