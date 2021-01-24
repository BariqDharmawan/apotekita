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
formTambahTransaksi.querySelector('select[name="kd_obat"]')
.addEventListener('change', function () {
    let stokObat = this.options[this.selectedIndex].dataset.persediaan
    formTambahTransaksi.querySelector('input[name="jumlah_beli"]').setAttribute('max', stokObat)
})