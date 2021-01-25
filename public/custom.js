const setRequiredField = (field) => {
    field.required = true
}

const formTambahObat = document.querySelector('#form-tambah-obat')
if (formTambahObat) {
    formTambahObat.querySelectorAll('input, select, textarea').forEach(field => {
        setRequiredField(field)
    })
}

const formTambahTransaksi = document.querySelector('#form-tambah-transaksi')
if (formTambahTransaksi) {
    formTambahTransaksi.querySelector('select[name="kd_obat"]')
    .addEventListener('change', function () {
        let stokObat = this.options[this.selectedIndex].dataset.persediaan
        formTambahTransaksi.querySelector('input[name="jumlah_beli"]').setAttribute('max', stokObat)
    })
}


var modalEditObat = document.getElementById('modalEditObat')
modalEditObat.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    var button = event.relatedTarget
    // Extract info from data-bs-* attributes
    var nama = button.getAttribute('data-nama')
    var kode = button.getAttribute('data-kode')
    var bentuk = button.getAttribute('data-bentuk')
    var tglProd = button.getAttribute('data-prod')
    var tglExp = button.getAttribute('data-exp')
    var harga = button.getAttribute('data-harga')
    var jumlah = button.getAttribute('data-jumlah')
    
    // Update the modal's content.
    var modalTitle = modalEditObat.querySelector('.modal-title')
    var inputKode = modalEditObat.querySelector('#kode-obat')
    var inputNama = modalEditObat.querySelector('#nama-obat')
    var inputBentuk = modalEditObat.querySelector('#bentuk-obat')
    var inputProd = modalEditObat.querySelector('#tgl-prod')
    var inputExp = modalEditObat.querySelector('#tgl-exp')
    var inputHarga = modalEditObat.querySelector('#harga')
    var inputJumlah = modalEditObat.querySelector('#jumlah-persediaan')

    modalTitle.innerHTML = `Edit obat <b>${nama}</b>`
    inputKode.value = kode
    inputNama.value = nama
    inputBentuk.value = bentuk
    inputProd.value = tglProd
    inputExp.value = tglExp
    inputHarga.value = harga
    inputJumlah.value = jumlah

})